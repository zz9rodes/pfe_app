import type { HttpContext } from '@adonisjs/core/http'
import { CompanyVersionService } from '#services/company_version_service'
import CompanyVersionPolicy from '#policies/company_version_policy'
import { inject } from '@adonisjs/core'
import { createCompanyVersionsValidator, editCompanyVerionsValidator } from '#validators/company_version'
import { errors } from '@vinejs/vine'
import Account from '#models/account'
import Company from '#models/company'
import auth from '@adonisjs/auth/services/main'
import CompanyVersion from '#models/company_version'

@inject()
export default class CompaniesVersionController {
  constructor(private CompanyVersionService: CompanyVersionService) { }

  async index({ }: HttpContext) { }




  async store({ request, response, bouncer ,auth,params}: HttpContext) {
    try {

      const account: Account| null | undefined = auth.user?.account

      if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {

        return  response.forbidden("You don't have access to this Ressources")
      }

      const data = await createCompanyVersionsValidator.validate(request.all())
      const company :Company|null= await Company.findBy('slug',params!.company_slug)

      return response.json(await this.CompanyVersionService.createCompanyVersion(company,data))
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }


  async show({ params, response }: HttpContext) {

    try {
      const company_version_slug = params!.company_version_slug

      return response.json(await this.CompanyVersionService.getCompanyversion(company_version_slug))
    } catch (error) {
      return response.json(error)
    }

  }


  async edit({ request, response, bouncer, params }: HttpContext) {
    try {

      const company: Company|undefined|null= await Company.findBy('slug',params.company_slug)

      if (await bouncer.with(CompanyVersionPolicy).denies('edit', company)) {

        return  response.forbidden("You don't have access to this Ressources")
      }

      const vesion: CompanyVersion | null = params.version_id ? await CompanyVersion.findBy('id', params.version_id) : null


      if (vesion?.id) {
        const data = await editCompanyVerionsValidator.validate(request.all())
        return response.json(await this.CompanyVersionService.editCompanyVersion(data, vesion?.id))
      }

      return


    } catch (error) {
      
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }

  }


  async destroy({ params, bouncer, response }: HttpContext) {
    try {

      const company: Company | null = params.company_slug ? await Company.findBy('slug', params.company_slug) : null
      if (await bouncer.with(CompanyVersionPolicy).denies('delete', company)) {

        return  response.forbidden("You don't have access to this Ressources")
      }

      if (params.version_id) {
        return response.json(await this.CompanyVersionService.destroyCompanyVersion(params.version_id))
      }

      return
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }
}