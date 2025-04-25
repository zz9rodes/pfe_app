import type { HttpContext } from '@adonisjs/core/http'
import { CompanyVersionService } from '#services/company_version_service'
import CompanyVersionPolicy from '#policies/company_version_policy'
import { CompanyService } from '#services/company_service'
import { createCompanyVersionsValidator,editCompanyVerionsValidator } from '#validators/company_version'
import CompanyPolicy from '#policies/company_policy'
import { create } from 'domain'
export default class CompaniesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}



  /**
   * Handle form submission for the create action
   */
  async store({ request ,response,bouncer,params}: HttpContext) {

    try {
          if (await bouncer.with(CompanyPolicy).denies('approve_or_desapprove')) {

            return response.forbidden('Cannot create this Company')
          }

          if (await bouncer.with(CompanyVersionPolicy).denies) {
            
            return response.forbidden('Message')
          }
          
          

        // const data= await createCompanyVersionsValidator.validate(request.all())

        
    } catch (error) {
      
    }

    response.ok
  }

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