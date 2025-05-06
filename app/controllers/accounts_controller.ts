import { createAccountValidator, updateAccountValidator } from '#validators/account'
import type { HttpContext } from '@adonisjs/core/http'
import { AccountService } from '#services/account_service'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'
@inject()
export default class AccountsController {
  constructor(private AccountService: AccountService) { }


  async index({ response }: HttpContext) {
     const result= await this.AccountService.getAllAccount()

     return response.status(result.statusCode).json(result)
  }


  async store({ request, response }: HttpContext) {
    try {
      const userId: number = request.input('userId')

      const data = await createAccountValidator.validate(request.all())

      const result = await this.AccountService.createAccount(data, userId)

      return response
            .status(result.statusCode)
            .json(result)

    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response
            .status(500)
            .json(
              ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
            )
    }
  }


  async show({ response, auth }: HttpContext) {
    try {
      const user = auth.user

      const result=await this.AccountService.getAccount(user!)
      return response
            .status(result.statusCode)
            .json(result)
    } catch (error) {
      return response.status(500).json( ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }


  async edit({ request, response, params }: HttpContext) {

    try {
      const slug = params.slug

      const data = await updateAccountValidator.validate(request.all())
      const result=await this.AccountService.editAccount(data, slug)
      return response
            .status(200)
            .json(result)

    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response
            .status(500)
            .json(
              ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
            )
    }
  }


  async destroy({ response, params }: HttpContext) {
    try {
      const accounId = params.id

      const result=await this.AccountService.destroyAccount(accounId)
      return response
            .status(result.statusCode)
            .json(result)

    } catch (error) {
       return  response
        .status(500)
        .json(
          ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
        )     
    }
  }

  async findByname({ request, response }: HttpContext) {
    try {

      const query = request.input('query')

      const result=await this.AccountService.findAccountByName(query)

      return response.status(result.statusCode).json(result)

    } catch (error) {

      return  response
      .status(500)
      .json(
        ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
      )        }
  }
}
