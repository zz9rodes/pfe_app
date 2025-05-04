import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, editUserValidator, loginUserValidator } from '#validators/user'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import User from '#models/user'
import { editUser } from '#abilities/main'
import auth from '@adonisjs/auth/services/main'

@inject()
export default class UsersController {
  constructor(private UserService: UserService) { }


  async index({ }: HttpContext) {
    return User.all()
  }


  async create({ request, response }: HttpContext) {
    try {
      const data = await createUserValidator.validate(request.all())

      return response.json(await this.UserService.Register(data))
    }
    catch (error) {

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }


  async show({ params, bouncer, response, auth }: HttpContext) {
    if (await bouncer.allows(editUser, params.id)) {

      return response.forbidden()
    }

    return response.json(await this.UserService.getUserDetails(auth.user!.id))
  }


  async edit({ request, response, params, bouncer }: HttpContext) {
    try {

      if (await bouncer.allows(editUser, params.id)) {

        return response.forbidden()
      }

      const data = await editUserValidator.validate(request.all())
      return response.json(await this.UserService.edit(params.id, data))
    }
    catch (error) {

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }

  async destroy({ auth, response }: HttpContext) {
    try {
      const user = auth!.user!
      await user.delete()
      return response.noContent()
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth!.user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return response.noContent()
    } catch (error) {
      return response.status(500).json(error)
    }
  }

  async login({ request, response }: HttpContext) {
    try {

      const data = await loginUserValidator.validate(request.body())
      return response.json(await this.UserService.login(data))
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error.messages)
      }
      else {
        return response.status(500).json(error)
      }
    }
  }
}
