import CompanyVersion from "#models/company_version"
import { HttpContext } from "@adonisjs/core/http"
HttpContext

export class CompanyVersionService {
  async createCompanyVersion(data: any) {
    const companyVersion = new CompanyVersion()

    await companyVersion.fill(data).save()
    return companyVersion
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

  async getCompaversion(slug:any) {
    const companyVersion: CompanyVersion|null=await CompanyVersion.findBy('slug',slug)
    let responseData=null
   
    if(companyVersion){
      responseData=CompanyVersion
    }

    return responseData
  }
}