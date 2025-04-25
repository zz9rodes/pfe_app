import type { HttpContext } from '@adonisjs/core/http'
import { CompanyVersionService } from '#services/company_version_service'
import { inject } from '@adonisjs/core'
import { createCompanyVersionsValidator } from '#validators/company_version'
import { errors } from '@vinejs/vine'

@inject()
export default class CompaniesController {
  constructor(private CompanyVersionService: CompanyVersionService) { }
  /**
   * Display a list of resource
   */
  async index({ }: HttpContext) { }



  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await createCompanyVersionsValidator.validate(request.all())
      return this.CompanyVersionService.createCompany(data)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        response.status(422).json(error)
      } else {
        response.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) { }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }




  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}