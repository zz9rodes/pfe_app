import Account from '#models/account'
import Company from '#models/company'
import CompanyRequest from '#models/company_request'
import User from '#models/user'
import ApiResponse from '#models/utils/ApiResponse'
import { CompanyStatus } from '#models/utils/index'
import { Exception } from '@adonisjs/core/exceptions'

export class CompaniesRequestService {
  async RequestCompany(user: User, data: any) {
    const account = user.account

    if (!account) {
      return ApiResponse.error('You Need to Complete Your Profile Before', 'E_ERROR')
    }

    const companyRequest = new CompanyRequest()

    const isAlreadyRequest = await CompanyRequest.findBy('admin_id', account.id)
    const isAlreadyCompany = await Company.findBy('account_id', account.id)

    if (isAlreadyRequest || isAlreadyCompany) {
      return ApiResponse.error('Your Already Request for  company', 'E_ERROR')
    }
    companyRequest.fill(data)
    companyRequest.adminId = account.id
    companyRequest.slug = crypto.randomUUID()
    await companyRequest.save()
    return ApiResponse.success('Your Request is Success', companyRequest)
  }

  async EditRequestCompany(slug: string, data: any) {
    const company_request = await CompanyRequest.findBy('slug', slug)

    if (company_request) {

      if(company_request.isActive || company_request.status==CompanyStatus.APPROVED){
        return ApiResponse.error("Your request seems to be already approved, try to create a new version.")
      }
      company_request.merge(data)
      await company_request.save()
    }
    return ApiResponse.success('Request Update SuccessFully', company_request)
  }

  async getRequestDetails(accountId: number | undefined) {
    try {
      if (!accountId) {
        return ApiResponse.error('Account not found')
      }

      const request = await CompanyRequest.query().where('admin_id', accountId)

      const companies = await Company.query()
        .where('account_id', accountId)
        .preload('activeDetails')
        .preload('details')

      if (!request) {
        return ApiResponse.error('No company found for this account')
      }

      return ApiResponse.success('Success', { request, companies })
    } catch (error) {
      console.log(error)
      throw new Exception(`Failed to retrieve company Request details: ${error.message}`, {
        status: 500,
        code: 'E_COMPANY_RETRIEVAL_FAILED',
      })
    }
  }

  async getAllRequestAndCompanie() {
    try {
      const request = await CompanyRequest.query().where('is_active', false)

      const companies = await Company.query().preload('activeDetails')

      return ApiResponse.success('Success', { request, companies })
    } catch (error) {
      console.log(error)
      throw new Exception(`Failed to retrieve company : ${error.message}`, {
        status: 500,
        code: 'E_COMPANY_RETRIEVAL_FAILED',
      })
    }
  }

  async getRequest(requestSlug: number | undefined) {
    try {
      if (!requestSlug) {
        return ApiResponse.error('Companie Request not found')
      }

      const request = await CompanyRequest.findBy('slug',requestSlug)

      if (!request) {
        return ApiResponse.error('No company found')
      }

      const account= await  Account.find(request.adminId)
                        
      
      return ApiResponse.success('Success', {request,account})
    } catch (error) {
      console.log(error)
      throw new Exception(`Failed to retrieve company Request details: ${error.message}`, {
        status: 500,
        code: 'E_COMPANY_RETRIEVAL_FAILED',
      })
    }
  }
}
