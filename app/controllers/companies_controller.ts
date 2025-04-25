import type { HttpContext } from '@adonisjs/core/http'
import  {CompanyService}  from '#services/company_service'
import { inject } from '@adonisjs/core'

@inject()
export default class CompaniesController {
  constructor(private CompanyService:CompanyService){}
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}

 

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

 


  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}