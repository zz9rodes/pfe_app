import { createAccountValidator, updateAccountValidator } from '#validators/account'
import type { HttpContext } from '@adonisjs/core/http'
import { AccountService } from '#services/account_service'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import User from '#models/user'

@inject()
export default class AccountsController {
  constructor(private AccountService: AccountService) {}


  async index({response}: HttpContext) {
      return response.json( await this.AccountService.getAllAccount())
  }


  async store({ request, response }: HttpContext) {
    try {
      const userId: number = request.input('userId')

      const data = await createAccountValidator.validate(request.all())
      
      return response.json(await this.AccountService.createAccount(data, userId))
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
    const  user=auth.user

      return response.json(await this.AccountService.getAccount(user!))
    } catch (error) {
      return response.json(error)
    }
  }


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


  async destroy({response, params }: HttpContext) {
    try {
      const accounId=params.id
      return response.json(await this.AccountService.destroyAccount(accounId))
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }

  async findByname({request,response}:HttpContext){
     try {

     const query = request.input('query')

     return response.json(await this.AccountService.FindAccountByname(query))
      
     } catch (error) {
      
       return {error}
     }
  }
}
