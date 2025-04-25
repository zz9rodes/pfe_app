import { AccountType } from '#models/utils/index'
import { createCompanyAccountValidator,createPersonnalAccountValidator } from '#validators/account'
import type { HttpContext } from '@adonisjs/core/http'
import { AccountService } from '#services/account_service'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import User from '#models/user'



@inject()
export default class AccountsController {


  constructor(private AccountService: AccountService) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {}



  /**
   * Handle form submission for the create action
   */
  async store({ request , response , auth}: HttpContext) {
    try {
      const account_type=request.input('account_type',AccountType.PERSONNAL)
      const user : User =auth.user!
      switch (account_type) {
        case AccountType.PERSONNAL:
          const personnalData= await createPersonnalAccountValidator.validate(request.all())
          response.json(await this.AccountService.createPersonnalAccount(personnalData,user));
          break;
        case AccountType.COMPANIES:
          const companyData= await createCompanyAccountValidator.validate(request.all())
          response.json(await this.AccountService.createCompanyAccount(companyData,user));

          break;
        default:

          break;
      }
    } catch (error) {
       if (error instanceof errors.E_VALIDATION_ERROR) {
              response.status(422).json(error)
            } else {
              response.status(500).json({error:'Internal Server Error'})
          }
    }
      
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