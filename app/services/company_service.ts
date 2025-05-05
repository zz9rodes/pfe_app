import Account from "#models/account";
import Company from "#models/company"
import CompanyVersion from "#models/company_version";
import { Exception } from '@adonisjs/core/exceptions'


const ERROR_ACCOUNT_NOT_FOUND = 'Account not found'
const ERROR_DUPLICATE_COMPANY = 'An account can only have one company'

export class CompanyService {

  async getAllCompanies() {
    const companies = await Company.all()
  
    await Promise.all(
      companies.map((company) => company.load('activeDetails'))
    )
  
    return companies
  }
  


  async createCompany(accountId: number, versionData: Partial<CompanyVersion>) {
    try {

      const existingCompany = await Company.findBy('account_id', accountId)
      if (existingCompany) {
        return ERROR_DUPLICATE_COMPANY
      }

      const admin = await Account.find(accountId)
      if (!admin) {
        return ERROR_ACCOUNT_NOT_FOUND
      }

      const company = new Company()
      company.fill({
        slug: crypto.randomUUID(),
        isVerify: false,
        accountId: admin.id,
      })
      await company.save()

      await company.related('admin').associate(admin)

      await company.related('details').create(versionData)

      return await company.load('details')

    } catch (error) {
      
      if (error.code === "ER_DUP_ENTRY") {
        return ERROR_DUPLICATE_COMPANY
      }
      return "Internal error"
    }
  }


  async updateCompany(companyId: string | null, data: any) {
    const { adminId, detailId, isVerify } = data

    const company = await Company.findBy('slug', companyId)
    if (!company) {
      return 'Invalid Company Info'
    }

    if (adminId) {
      const admin = await Account.findBy('slug', adminId)
      if (admin) {
        await company.related('admin').associate(admin)
      }
    }

    if (detailId) {

      const version = await CompanyVersion.find(detailId)


      if (version && version.company_id == company.id) {

        await CompanyVersion
          .query()
          .where('company_id', company.id)
          .where('is_active', true)
          .update({ is_active: false })

        version.isActive = true
        await version!.save()

      }

    }

    if (typeof isVerify === 'boolean') {
      company.isVerify = isVerify
    }

    await company.load('activeDetails')
    await company.save()

    return company
  }


  async destroyCompany(companyId: string) {
    const company = await Company.findBy('slug', companyId)

    if (company) {
      await company.delete()
    }
    return
  }

  async getCompanyDetails(accountId: number | undefined): Promise<Company | { error: string }> {
    try {

      if (!accountId) {
        return { error: 'Account not Found' }
      }

      const company = await Company.query()
        .where('account_id', accountId)
        .preload('activeDetails')
        .firstOrFail()



      if (!company) {
        return { error: 'No company found for this account' }
      }

      return company
    } catch (error) {
      throw new Exception(`Failed to retrieve company details: ${error.message}`, {
        status: 500,
        code: 'E_COMPANY_RETRIEVAL_FAILED',
      })
    }
  }
}
