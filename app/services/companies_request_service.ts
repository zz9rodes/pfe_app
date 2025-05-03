import Company from "#models/company"
import CompanyRequest from "#models/company_request"
import User from "#models/user"

export class CompaniesRequestService {
  async RequestCompany(user: User, data: any) {
    const account= user.account

    if(!account){
        return "You Need to Complete Your Profile Before"
    }

    const companyRequest = new CompanyRequest()

    const isAlreadyRequest=await CompanyRequest.findBy('admin_id',account.id)
    const isAlreadyCompany =await Company.findBy('account_id',account.id)

    if(isAlreadyRequest || isAlreadyCompany){
     return "Your Already have A company"
    }
    companyRequest.fill(data)
    companyRequest.accountId = account.id
    companyRequest.slug= crypto.randomUUID()
    await companyRequest.save()
    return companyRequest
  }

  async EditRequestCompany(slug: string, data: any) {
    const company_request = await CompanyRequest.findBy('slug', slug)

    if (company_request) {
      company_request.merge(data)
      await company_request.save()
    }
    return company_request
  }
}