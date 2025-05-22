import type { HttpContext } from '@adonisjs/core/http'
import { CompanyService } from '#services/company_service'
import { createCompanyVersionsValidator } from '#validators/company_version'
import { editCompanyValidator } from '#validators/company'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import CompanyRequest from '#models/company_request'
import { cleanCompanyData } from '#models/utils/helper'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class CompaniesController {
  constructor(private CompanyService: CompanyService) {}

  async index({ response }: HttpContext) {
    const result = await this.CompanyService.getAllCompanies()
    return response.status(result.statusCode).json(result)
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      
      if (!auth.user!.isAdmin) {
        return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }

      const company_request = await CompanyRequest.findBy('slug', request.input('slug_request'))

      const validData = await createCompanyVersionsValidator.validate(company_request)
      const data = cleanCompanyData(validData)

      const result = await this.CompanyService.createCompany(company_request!.adminId, data)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async show({ response, auth }: HttpContext) {
    
    try {
      const accountId = auth?.user?.account.id

      const result = await this.CompanyService.getCompanyDetails(accountId)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async edit({ request, response, params, auth }: HttpContext) {
    try {
      if (!auth.user!.isAdmin) {
        return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }

      const data = await editCompanyValidator.validate(request.all())

      const result = await this.CompanyService.updateCompany(params.companyId, data)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async destroy({ params, auth, response }: HttpContext) {
    try {
      if (!auth.user!.isAdmin) {
        return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }

      let result = null

      if (params.companyId) {
        result = await this.CompanyService.destroyCompany(params.companyId)
        return response.status(result?.statusCode).json(result)
      }

      return response.status(200).json({ message: 'Ok', success: true })
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }
}
