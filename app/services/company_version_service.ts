import Company from "#models/company"
import CompanyVersion from "#models/company_version"


const ERROR_INVALID_COMPANY = 'Invalid Company Id'
export class CompanyVersionService {
  async createCompanyVersion(company: Company | null, companyVersionData: any) {
    if (!company) {
      return ERROR_INVALID_COMPANY
    }
  
    const version = await company.related('details').create(companyVersionData)
  
    await company.save()
  
    if (companyVersionData.isActive) {
      await this.ActiveCompanyversion(version.id)
    }
  
    await company.load('activeDetails')
  
    return company
  }
  

  async editCompanyVersion(data: any, params: Record<string, any>) {
    const companyVersion = await CompanyVersion.findBy('slug', params.company_version_slug)


    return params.company_version_slug ? await companyVersion?.fill(data).save() : null
  }

  async destroyCompanyVersion(company_version_slug:string){
    const companyVersion = await CompanyVersion.findBy('slug', company_version_slug)

    if(companyVersion){
      await companyVersion.delete()
    }

    return 
  }

  async getCompanyversion(slug:any) {
    const companyVersion: CompanyVersion|null=await CompanyVersion.findBy('slug',slug)
    let responseData=null
   
    if(companyVersion){
      responseData=CompanyVersion
    }

    return responseData
  }

  async ActiveCompanyversion(id: number) {
    const targetVersion = await CompanyVersion.find(id)

    if (!targetVersion) {
      throw new Error('CompanyVersion not found')
    }

    const companyId = targetVersion.company_id

    await CompanyVersion
      .query()
      .where('company_id', companyId)
      .update({ isActive: false })

    targetVersion.isActive = true
    await targetVersion.save()

    return targetVersion
  }
}