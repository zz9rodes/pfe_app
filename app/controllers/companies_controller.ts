import type { HttpContext } from '@adonisjs/core/http'
import CompanyVersionPolicy from '#policies/company_version_policy'
import { CompanyService } from '#services/company_service'
import { createCompanyVersionsValidator } from '#validators/company_version'
import { editCompanyValidator } from '#validators/company'
import CompanyPolicy from '#policies/company_policy'
import Account from '#models/account'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'

@inject()
export default class CompaniesController {
  constructor(private CompanyService: CompanyService) { }
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) { }



  /**
   * Handle form submission for the create action
   */
  async store({ request, response, bouncer, params }: HttpContext) {
    try {

      if (await bouncer.with(CompanyPolicy).denies('approve_or_desapprove')) {

        return  response.forbidden("You don't have access to this Ressources")
      }
      const account: Account | null = params.slug ? await Account.findBy('slug', params.slug) : null
      if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {

        return  response.forbidden("You don't have access to this Ressources")
      }

      const data = await createCompanyVersionsValidator.validate(request.all())

      return  response.json(this.CompanyService.createCompany(data))
    } catch (error) {
      console.log(error);
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {

    try {
      const company_slug = params!.company_slug

      return response.json(await this.CompanyService.getCompaversion(company_slug))
    } catch (error) {
      return response.json(error)
    }

  }

  /**
   * Edit individual record
   */
  async edit({ request, response, bouncer, params }: HttpContext) {

    try {

      if (await bouncer.with(CompanyPolicy).denies('approve_or_desapprove')) {

        return  response.forbidden("You don't have access to this Ressources")
      }


      const data = await editCompanyValidator.validate(request.all())

      return  response.json(this.CompanyService.updateCompany(params.slug, data))
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }



  /**
   * Delete record
   */
  async destroy({ params, bouncer, response }: HttpContext) {
      try {
  
        if (await bouncer.with(CompanyPolicy).denies('approve_or_desapprove')) {

          return  response.forbidden("You don't have access to this Ressources")
        }
  
        if (params.company_slug) {
          return response.json(await this.CompanyService.destroyCompany(params.company_slug))
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