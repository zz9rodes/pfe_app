import { createAccountValidator, updateAccountValidator } from '#validators/account'
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
  async index({response}: HttpContext) {
      return response.json( await this.AccountService.getAllAccount())
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const user: User = auth.user!

      const data = await createAccountValidator.validate(request.all())
      
      return response.json(await this.AccountService.createAccount(data, user))
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
  async show({ response,auth }: HttpContext) {
    try {
    const  user=auth.user

      return response.json(await this.AccountService.getAccount(user!))
    } catch (error) {
      return response.json(error)
    }
  }

  /**
   * Edit individual record
   */
  async edit({ request,response,params }: HttpContext) {

    
    try {
      const slug=params.slug

      const data = await updateAccountValidator.validate(request.all())
      return response.json(await this.AccountService.editAccount(data, slug))
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
  async destroy({response, params }: HttpContext) {
    try {
      const id=params.id
      return response.json(await this.AccountService.destroyAccount(id))
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }

  async findByname({request,response,params}:HttpContext){
     try {

     const query = request.input('query')

     return response.json(await this.AccountService.FindAccountByname(query))
      
     } catch (error) {
      console.log(error);
      
       return {error}
     }
  }
}
