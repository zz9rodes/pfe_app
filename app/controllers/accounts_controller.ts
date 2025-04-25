import { AccountType } from '#models/utils/index'
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
  async index({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    try {
      const user: User = auth.user!

      const data = await createAccountValidator.validate(request.all())
      response.json(await this.AccountService.createAccount(data, user))
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
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ request,response,params }: HttpContext) {
    try {
      const id=params.id

      const data = await updateAccountValidator.validate(request.all())
      response.json(await this.AccountService.editAccount(data, id))
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        response.status(422).json(error)
      } else {
        response.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }

  /**
   * Delete record
   */
  async destroy({response, params }: HttpContext) {
    try {
      const id=params.id
      response.json(await this.AccountService.destroyAccount(id))
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        response.status(422).json(error)
      } else {
        response.status(500).json({ error: 'Internal Server Error' })
      }
    }
  }
}
