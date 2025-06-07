import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'
import CompanyVersionPolicy from '#policies/company_version_policy'
import { createCompanyVersionsValidator, editCompanyVerionsValidator } from '#validators/company_version'
import { inject } from '@adonisjs/core'
import { CompaniesRequestService } from '#services/companies_request_service'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'


@inject()
export default class CompaniesRequestsController {

  constructor(private CompaniesRequestService: CompaniesRequestService) { }
  async store({ request, response, bouncer, auth }: HttpContext) {
    console.log(request.all())
    try {
      const account: Account | null | undefined = request.input('slug') ? await Account.findBy('slug', request.input('slug')) : null
      if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {

        return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }

      const data = await createCompanyVersionsValidator.validate(request.all())
      
      const result = await this.CompaniesRequestService.RequestCompany(auth!.user!, data)
      return response.status(result.statusCode).json(result)
    } catch (error) {
      console.log(error);
      
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response
        .status(500)
        .json(
          ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
        )
    }
  }

  async edit({ response, request, params, bouncer }: HttpContext) {
    try {
      const account: Account | null = params.slug ? await Account.findBy('slug', params.slug) : null
      if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {

        return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }
      const data = await editCompanyVerionsValidator.validate(request.all())
      const slug = params.slug_request
      const result = await this.CompaniesRequestService.EditRequestCompany(slug, data)
      return response.status(result.statusCode).json(result)
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response
        .status(500)
        .json(
          ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
        )
    }
  }

    async getAccountRequest({ response, request, auth, bouncer }: HttpContext) {
          try {
              const accountId = auth?.user?.account.id
        
              const result = await this.CompaniesRequestService.getRequestDetails(accountId)
        
              return response.status(result.statusCode).json(result)
            } catch (error) {
              return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
            }
  }
}