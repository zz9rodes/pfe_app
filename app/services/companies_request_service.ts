import Company from "#models/company"
import CompanyRequest from "#models/company_request"
import User from "#models/user"
import ApiResponse from "#models/utils/ApiResponse"

export class CompaniesRequestService {
  async RequestCompany(user: User, data: any) {
    
    const account= user.account

    if(!account){
        return ApiResponse.error("You Need to Complete Your Profile Before","E_ERROR")
    }

    const companyRequest = new CompanyRequest()

    const isAlreadyRequest=await CompanyRequest.findBy('admin_id',account.id)
    const isAlreadyCompany =await Company.findBy('account_id',account.id)

    if(isAlreadyRequest || isAlreadyCompany){
     return ApiResponse.error("Your Already have A company","E_ERROR")

    }
    companyRequest.fill(data)
    companyRequest.adminId = account.id
    companyRequest.slug= crypto.randomUUID()
    await companyRequest.save()
    return ApiResponse.success("success", companyRequest)
  }

  async EditRequestCompany(slug: string, data: any) {
    const company_request = await CompanyRequest.findBy('slug', slug)

    if (company_request) {
      company_request.merge(data)
      await company_request.save()
    }
    return ApiResponse.success("Sucess",company_request)
  }
}