import Company from "#models/company"
import CompanyVersion from "#models/company_version"
import ApiResponse from "#models/utils/ApiResponse"


export class CompanyVersionService {
  async createCompanyVersion(company: Company | null, companyVersionData: any) {
    if (!company) {
      return ApiResponse.notFound("Invalid Company Id")
    }
  
    const version = await company.related('details').create(companyVersionData)
  
    await company.save()
  
    if (companyVersionData.isActive) {
      await this.ActiveCompanyversion(version.id)
    }
  
    
    const responseData=await company.load('activeDetails')
  
    return ApiResponse.success("New Company Version Has Been Created",responseData )
  }
  

  async editCompanyVersion(data: any, versionId:number) {
    const companyVersion = await CompanyVersion.find(versionId)

    return ApiResponse.success(" Company Version Has Been Update", versionId ? await companyVersion?.merge(data).save() : null)
  }

  async destroyCompanyVersion(versionId:string){
    const companyVersion = await CompanyVersion.find(versionId)

    if(companyVersion){
      await companyVersion.delete()
    }

    return  ApiResponse.success("The Company Version has Been delete")
  }

  async getCompanyversion(id:number) {
    const version: CompanyVersion|null=await CompanyVersion.find(id)
    let responseData=null
   
    if(!version){
      return ApiResponse.error("Ressource Not Found")
    }
    
    const company=await Company.find(version.company_id)



    return ApiResponse.success("success",{version,company})
  }

  async getAllCompanyversion(companyId:any) {
    const company: Company|null=await Company.findBy('slug',companyId)
    let responseData=null
   
    if(company){
      await company.load('details')
      await company.load('activeDetails')
      responseData=company
    }

    return ApiResponse.success("success",responseData)
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