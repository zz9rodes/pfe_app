import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { CvProfileService } from '#services/cv_profile_service'
import { createCvProfileValidator, updateCvProfileValidator } from '#validators/cv_profile'
import { errors } from '@vinejs/vine'
import CvProfilePolicy from '#policies/cv_profile_policy'
import CvProfile from '#models/cv_profile'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class CvProfilesController {
  constructor(private CvProfileService: CvProfileService) {}

  async index({}: HttpContext) {}

  async store({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        return response.status(401).json(ApiResponse.error('unauthorized'))
      }

      const data = await createCvProfileValidator.validate(request.all())

      await user.load('account')

      const account = user.account

      if (!account) {
        return response
          .status(400)
          .json(ApiResponse.badRequest('You Need to Complete Your Profile'))
      }

      const result = await this.CvProfileService.create(account, data)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async show({ params, response }: HttpContext) {
    const slug = params.cvProfileId

    const result = await this.CvProfileService.getCvprofileDetails(slug)

    return response.status(result.statusCode).json(result)
  }

  async getDetails({response,auth }: HttpContext) {

    try {
      const user=auth.user
      if(!user){
        return response.unauthorized(ApiResponse.badRequest("unauthorized"))
      }
      const account=user.account
      
      await  account.load('cvProfiles')

      return response.status(200).json(ApiResponse.success('Success',account.cvProfiles))
    } catch (error) {
      console.log(error)
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }


  }

  async edit({ request, response, auth, bouncer, params }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        return response.status(401).json(ApiResponse.error('unauthorized'))
      }

      const data = await updateCvProfileValidator.validate(request.all())

      const cvProfileId = params.cvProfileId

      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (cvProfile) {
        await cvProfile.load('account')

        await bouncer.with(CvProfilePolicy).authorize('edit', cvProfile?.accountId)

        const result = await this.CvProfileService.update(cvProfileId, data)
        return response.status(result.statusCode).json(result)
      }

      return response.badRequest()
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(
          ApiResponse.validation('Invalid input', error.messages)
        )
      }

      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))

    }
  }

  async destroy({ params }: HttpContext) {}
}
