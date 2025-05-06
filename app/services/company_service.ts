import Account from "#models/account";
import Company from "#models/company"
import CompanyVersion from "#models/company_version";
import ApiResponse from "#models/utils/ApiResponse";
import { Exception } from '@adonisjs/core/exceptions'


const ERROR_ACCOUNT_NOT_FOUND = 'Account not found'
const ERROR_DUPLICATE_COMPANY = 'An account can only have one company'

export class CompanyService {

  async getAllCompanies() {
    const companies = await Company.all()
  
    await Promise.all(
      companies.map((company) => company.load('activeDetails'))
    )
  
    return ApiResponse.success("success",companies)
  }
  


  async createCompany(accountId: number, versionData: Partial<CompanyVersion>) {
    try {

      const existingCompany = await Company.findBy('account_id', accountId)
      if (existingCompany) {

        return ApiResponse.error("An account can only have one company")
      }

      const admin = await Account.find(accountId)
      if (!admin) {

        return ApiResponse.error("Account not found")
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

      return ApiResponse.success("success",await company.load('details'))

    } catch (error) {
      
      if (error.code === "ER_DUP_ENTRY") {
        return ApiResponse.error("An account can only have one company")
      }

      return ApiResponse.error("Internal error")
    }
  }


  async updateCompany(companyId: string | null, data: any) {
    const { adminId, detailId, isVerify } = data

    const company = await Company.findBy('slug', companyId)
    if (!company) {
      return ApiResponse.error("Invalid Company Info")
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

    return ApiResponse.success("success",company)
  }


  async destroyCompany(companyId: string) {
    const company = await Company.findBy('slug', companyId)

    if (company) {
      await company.delete()
    }
    return ApiResponse.success("success")
  }

  async getCompanyDetails(accountId: number | undefined): Promise<Company | {error:string,statusCode:number}> {
    try {

      if (!accountId) {
        return ApiResponse.error("Account not found")
      }

      const company = await Company.query()
        .where('account_id', accountId)
        .preload('activeDetails')
        .firstOrFail()



      if (!company) {
        return ApiResponse.error("No company found for this account")
      }

        return      {error:"",statusCode:200}
    } catch (error) {
      throw new Exception(`Failed to retrieve company details: ${error.message}`, {
        status: 500,
        code: 'E_COMPANY_RETRIEVAL_FAILED',
      })
    }
  }
}
