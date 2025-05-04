import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import { CvProfileService } from '#services/cv_profile_service'
import { createCvProfileValidator, updateCvProfileValidator } from '#validators/cv_profile'
import { errors } from '@vinejs/vine'
import CvProfilePolicy from '#policies/cv_profile_policy'
import CvProfile from '#models/cv_profile'



@inject()
export default class CvProfilesController {
  constructor(private CvProfileService: CvProfileService) { }

  async index({ }: HttpContext) { }

  

  async store({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user

      if (!user) {
        return response.unauthorized()
      }

      const data = await createCvProfileValidator.validate(request.all())

      await user.load('account')

      const account = user.account

      if (!account) {
        return response.badRequest({ message: 'You Need to Complete Your Profile' })
      }

      const cvProfile = await this.CvProfileService.create(account, data)

      return response.json(cvProfile)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }



  async show({ params,response }: HttpContext) {

    const slug=params.cvProfileId

    const result= await this.CvProfileService.getCvprofileDetails(slug)

    return response.json(result)

   }

  async edit({ request, response, auth, bouncer,params }: HttpContext) {
    try {

      const user = auth.user

      if (!user) {
        return response.unauthorized()
      }



      const data = await updateCvProfileValidator.validate(request.all())

      const cvProfileId = params.cvProfileId


      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (cvProfile) {
        await cvProfile.load('account')

        await bouncer.with(CvProfilePolicy).authorize('edit', cvProfile?.accountId)

        const updatedCvProfile = await this.CvProfileService.update(cvProfileId, data)
        return response.json(updatedCvProfile)

      }

      return response.badRequest()
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error.messages)
      } else if (error.status === 403) {
        return response.forbidden('Vous n\'êtes pas autorisé à modifier ce profil.')
      } else {
        return response.internalServerError({ message: 'Erreur interne du serveur.', error })
      }
    }
  }



async destroy({ params }: HttpContext) { }
}