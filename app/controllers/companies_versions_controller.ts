import type { HttpContext } from '@adonisjs/core/http'
import { CompanyVersionService } from '#services/company_version_service'
import CompanyVersionPolicy from '#policies/company_version_policy'
import { inject } from '@adonisjs/core'
import { createCompanyVersionsValidator, editCompanyVerionsValidator } from '#validators/company_version'
import { errors } from '@vinejs/vine'
import Account from '#models/account'
import Company from '#models/company'

@inject()
export default class CompaniesVersionController {
  constructor(private CompanyVersionService: CompanyVersionService) { }
  /** 
   * Display a list of resource
   */
  async index({ }: HttpContext) { }



  /**
   * Handle form submission for the create action
   */
  async store({ request, response, bouncer, params }: HttpContext) {
    try {

      const account: Account | null = params.slug ? await Account.findBy('slug', params.slug) : null
      if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {

        return  response.forbidden("You don't have access to this Ressources")
      }

      const data = await createCompanyVersionsValidator.validate(request.all())
      return response.json(await this.CompanyVersionService.createCompanyVersion(data))
    } catch (error) {
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
      const company_version_slug = params!.company_version_slug

      return response.json(await this.CompanyVersionService.getCompaversion(company_version_slug))
    } catch (error) {
      return response.json(error)
    }

  }

  /**
   * Edit individual record
   */
  async edit({ request, response, bouncer, params }: HttpContext) {
    try {

      const account: Company | null = params.company_slug ? await Company.findBy('slug', params.company_slug) : null
      if (await bouncer.with(CompanyVersionPolicy).denies('edit', account)) {

        return  response.forbidden("You don't have access to this Ressources")
      }

      if (params.company_version_slug) {
        const data = await editCompanyVerionsValidator.validate(request.all())
        return response.json(await this.CompanyVersionService.editCompanyVersion(data, params))
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

  /**
   * Delete record
   */
  async destroy({ params, bouncer, response }: HttpContext) {
    try {

      const account: Company | null = params.company_slug ? await Company.findBy('slug', params.company_slug) : null
      if (await bouncer.with(CompanyVersionPolicy).denies('delete', account)) {

        return  response.forbidden("You don't have access to this Ressources")
      }

      if (params.company_version_slug) {
        return response.json(await this.CompanyVersionService.destroyCompanyVersion(params.company_version_slug))
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