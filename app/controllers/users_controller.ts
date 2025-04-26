import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, editUserValidator, loginUserValidator } from '#validators/user'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import User from '#models/user'

@inject()
export default class UsersController {
  constructor(private UserService: UserService) {}

  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
     return User.all()
  }

  /**
   * Display form to create a new record
   */
  async create({ request, response }: HttpContext) {
    try {
      const data  = await createUserValidator.validate(request.all())

      response.json( await this.UserService.Register(data))
    } 
    catch (error) {
      
      if (error instanceof errors.E_VALIDATION_ERROR) {
        response.status(422).json(error)
      } else {
        response.status(500).json({message:'Internal Server Error',error:error})
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
  async edit( {request,response,params} : HttpContext) {
    try {
      const data  = await editUserValidator.validate(request.all())

      response.json( await this.UserService.edit(params.id,data))
    } 
    catch (error) {
      
      if (error instanceof errors.E_VALIDATION_ERROR) {
        response.status(422).json(error)
      } else {
        response.status(500).json({message:'Internal Server Error',error:error})
      }
    }
  }

  /**
   * Delete record
   */
  async destroy({ auth, response }: HttpContext) {
    try {
      const user = auth!.user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      response.status(200).noContent()
  } catch (error) {
      console.log(error);

      response.status(500).json(error)
  }
  }

  async login({ request, response }: HttpContext) {
    try {

        const data = await loginUserValidator.validate(request.body())
        response.json(await this.UserService.login(data))
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            response.status(422).json(error.messages)
        }
        else{
            response.status(500).json(error)
        }
    }
}
}
