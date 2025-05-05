import Company from "#models/company"
import CompanyVersion from "#models/company_version"
import { messages } from "@vinejs/vine/defaults"
import { ok } from "assert"


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
  

  async editCompanyVersion(data: any, versionId:number) {
    const companyVersion = await CompanyVersion.find(versionId)

    return versionId ? await companyVersion?.merge(data).save() : null
  }

  async destroyCompanyVersion(versionId:string){
    const companyVersion = await CompanyVersion.find(versionId)

    if(companyVersion){
      await companyVersion.delete()
    }
    return  {
      messages:"ok"
    }
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