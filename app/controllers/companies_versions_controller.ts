import type { HttpContext } from '@adonisjs/core/http'
import { CompanyVersionService } from '#services/company_version_service'
import CompanyVersionPolicy from '#policies/company_version_policy'
import { inject } from '@adonisjs/core'
import { createCompanyVersionsValidator, editCompanyVerionsValidator } from '#validators/company_version'
import { errors } from '@vinejs/vine'
import Account from '#models/account'
import Company from '#models/company'
import CompanyVersion from '#models/company_version'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class CompaniesVersionController {
  constructor(private CompanyVersionService: CompanyVersionService) { }

  async index({ }: HttpContext) { }




  async store({ request, response, bouncer ,auth,params}: HttpContext) {
    try {

      const account: Account| null | undefined = auth.user?.account

      if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {

         return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }

      const data = await createCompanyVersionsValidator.validate(request.all())
      const company :Company|null= await Company.findBy('slug',params!.companyId)

      const result=await this.CompanyVersionService.createCompanyVersion(company,data)
      return response.status(result.statusCode).json(result)
    } catch (error) {
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


  async show({ params, response }: HttpContext) {

    try {
      const version = params!.versionId

      const result=await this.CompanyVersionService.getCompanyversion(version)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response.status(500).json( ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }

  }


  async edit({ request, response, bouncer, params }: HttpContext) {
    try {

      const company: Company|undefined|null= await Company.findBy('slug',params.companyId)

      if (await bouncer.with(CompanyVersionPolicy).denies('edit', company)) {

       return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }

      const vesion: CompanyVersion | null = params.versionId ? await CompanyVersion.findBy('id', params.versionId) : null


      if (vesion?.id) {
        const data = await editCompanyVerionsValidator.validate(request.all())
        const result=await this.CompanyVersionService.editCompanyVersion(data, vesion?.id)
        return response.status(result.statusCode).json( result)
      }

      return response.ok

    } catch (error) {
      
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


  async destroy({ params, bouncer, response }: HttpContext) {
    try {

      const company: Company | null = params.companyId ? await Company.findBy('slug', params.companyId) : null
      if (await bouncer.with(CompanyVersionPolicy).denies('delete', company)) {

        return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }

      if (params.versionId) {
        const result=await this.CompanyVersionService.destroyCompanyVersion(params.versionId)
        return response.status(result.statusCode).json(result)
      }

      return response.ok
    } catch (error) {
      return response
                  .status(500)
                  .json(
                    ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
            )
    }
  }
}