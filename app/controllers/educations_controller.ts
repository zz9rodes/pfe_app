import { createEducationValidator, updateEducationValidator } from '#validators/education'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { EducationService } from '#services/education_service'
import { errors } from '@vinejs/vine'



@inject()
export default class EducationsController {

    async index({ auth, response }: HttpContext) {


        const user = auth.user
        if (!user) {
            response.unauthorized()
        }

        const result = await this.EducationService.getAllCvProfileEducation(user?.account)

        return response.json(result)

    }

    constructor(private EducationService: EducationService) { }
    async store({ request, response, auth, params }: HttpContext) {
        try {

            const user = auth.user
            if (!user) {
                response.unauthorized()
            }

            const cvProfileId = params.cvProfileId

            const data = await createEducationValidator.validate(request.all())

            const result = await this.EducationService.CreateNewEducation(cvProfileId, data)

            return response.json(result)

        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(error)
            } else {
                return response.internalServerError({ message: 'Internal Server Error.', error })
            }
        }
    }


    async edit({ request, response, auth, params }: HttpContext) {
        try {

            const user = auth.user
            if (!user) {
                response.unauthorized()
            }

            const educationId = params.educationId

            const data = await updateEducationValidator.validate(request.all())



            const result = await this.EducationService.UpdateEducation(educationId, data)

            return response.json(result)

        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(error)
            } else {
                return response.internalServerError({ message: 'Internal Server Error.', error })
            }
        }
    }

    async destroy({ response, auth, params }: HttpContext) {
        try {

            const user = auth.user
            if (!user) {
                response.unauthorized()
            }

            const educationId = params.educationId

            await this.EducationService.DeleteEducation(educationId)

            return response.noContent()

        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(error)
            } else {
                return response.internalServerError({ message: 'Internal Server Error.', error })
            }
        }
    }
}