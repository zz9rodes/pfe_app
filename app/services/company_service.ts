import Account from "#models/account";
import Company from "#models/company"

export class CompanyService {

  async createCompany(adminId: number, data: any) {

    const { versionData } = data

    const company = new Company()

    
    const companyAdmin = await Account.find(adminId)

    if (!companyAdmin) {
      
      return "Somethiing Rong"
    }

    company.fill({ slug: crypto.randomUUID(), isVerify: false })

    console.log("avant d'associer a un admin on a deja rempli");
    
    await company.related('admin').associate(companyAdmin)

    // console.log(companyAdmin);
    
    await company.save()
    await  company.related('details').create(versionData)

    // return company
    return await company.load('details')
  }

  async updateCompany(slug: string | null, data: any) {
    const { admin, details, isVerify } = data

    const company = await Company.findBy('slug', slug)

    let responseData = null
    if (company) {
      company.isVerify = isVerify
      await company.related('admin').associate(admin)

      await company
        .related('details')
        .query()
        .where('is_active', true)
        .update({ is_active: false })

      await company.related('details').create({
        ...details,
        isActive: true,
      })

      responseData = await company.save()
    }

    return responseData !== null ? responseData : null
  }

  async destroyCompany(company_slug: string) {
    const company = await Company.findBy('slug', company_slug)

    if (company) {
      await company.delete()
    }
    return
  }

  async getCompaversion(slug: any) {
    const company: Company | null = await Company.findBy('slug', slug)
    let responseData = null

    if (company) {
      responseData = Company
    }

    return responseData
  }
}
