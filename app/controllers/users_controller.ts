import type { HttpContext } from '@adonisjs/core/http'
import { createUserAccountValidator, createUserValidator, editUserValidator, loginUserValidator } from '#validators/user'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import User from '#models/user'
import { editUser } from '#abilities/main'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class UsersController {
  constructor(private UserService: UserService) { }


  async index({ }: HttpContext) {
    return User.all()
  }

  async create({ request, response }: HttpContext) {
    try {
      const data = await createUserValidator.validate(request.all())
      const result = await this.UserService.Register(data)

      return response.status(result.statusCode).json(result)

    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response.status(500).json(
        ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
      )
    }
  }

  async show({ response, auth }: HttpContext) {

   

    const result = await this.UserService.getUserDetails(auth.user!.id)
    return response
      .status(result?.statusCode ?? 200)
      .json(result)
  }

  async edit({ request, response, params, bouncer }: HttpContext) {
    try {

      if (await bouncer.denies(editUser, params.id)) {
        return response.forbidden(
          ApiResponse.error('You are not authorized to edit this user', 'E_FORBIDDEN')
        )
      }

      const data = await editUserValidator.validate(request.all())

      const result = await this.UserService.edit(params.id, data)

      return response.status(result.statusCode).json(result)
    }
    catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response.status(500).json(
        ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
      )
    }
  }

  async destroy({ auth, response }: HttpContext) {
    try {
      const user = auth!.user!
      await user.delete()
      return response.status(200).json(ApiResponse.success('User are Lougout successfully', response.noContent()))
    } catch (error) {
      return response.status(500).json(
        ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
      )
    }
  }

  async logout({ auth, response }: HttpContext) {
    try {
      const user = auth!.user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      return response.status(200).json(ApiResponse.success('User are Lougout successfully', response.noContent()))
    } catch (error) {
      return response.status(500).json(
        ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
      )
    }
  }

  async login({ request, response }: HttpContext) {
    try {

      const data = await loginUserValidator.validate(request.body())
      const result = await this.UserService.login(data)
      return response.status(result.statusCode).json(result)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response.status(500).json(
        ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
      )
    }
  }

  async createAccount({request,response}:HttpContext){
    try {

      const data= await createUserAccountValidator.validate(request.all())

      const result= await this.UserService.createUserAccount(data);
      
      return response.status(result.statusCode).json(result)
    } catch (error) {
       if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response.status(500).json(
        ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
      )
    }
  }

  async user_request({request,response}:HttpContext){
        try {

      const {email,accountType}=  request.all()

      const result= await this.UserService.createUserRequest(email,accountType);
      
      return response.status(result.statusCode).json(result)
    } catch (error) {
      
      return response.status(500).json(
        ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error)
      )
    }
  }
}
