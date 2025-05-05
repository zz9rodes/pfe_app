import type { HttpContext } from '@adonisjs/core/http'
import { CompanyService } from '#services/company_service'
import { createCompanyVersionsValidator } from '#validators/company_version'
import { editCompanyValidator } from '#validators/company'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import CompanyRequest from '#models/company_request'
import { cleanCompanyData } from '#models/utils/helper'

@inject()
export default class CompaniesController {
  constructor(private CompanyService: CompanyService) { }

  async index({  response}: HttpContext) {
     const result = await this.CompanyService.getAllCompanies()
     return response.json( result)    
   }




  async store({ request, response, auth }: HttpContext) {
    try {

      if (!auth.user!.isAdmin) {
        return response.forbidden("You don't have access to this Ressources")
      }     
      
      const company_request = await CompanyRequest.findBy('slug', request.input('slug_request'))
      
      const validData = await createCompanyVersionsValidator.validate(company_request)
      const data = cleanCompanyData(validData)
      
      return response.json( await this.CompanyService.createCompany(company_request!.accountId,data))
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }


  async show({ response,auth }: HttpContext) {

    try {
      const accountId=auth?.user?.account.id 

      
      return response.json(await this.CompanyService.getCompanyDetails(accountId))
    } catch (error) {
      return response.json(error)
    }

  }


  async edit({ request, response, params ,auth}: HttpContext) {
    try {
     
      if (!auth.user!.isAdmin) {
        return response.forbidden("You don't have access to this Ressources")
      }   
  
      const data = await editCompanyValidator.validate(request.all())
      
      const updatedCompany = await this.CompanyService.updateCompany(params.companyId, data)
  
      
      return response.ok(updatedCompany)
  
    } catch (error) {
      
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }
  
  async destroy({ params, auth, response }: HttpContext) {
    try {

      if (!auth.user!.isAdmin) {
        return response.forbidden("You don't have access to this Ressources")
      }  

      if (params.companyId) {
        return response.json(await this.CompanyService.destroyCompany(params.companyId))
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