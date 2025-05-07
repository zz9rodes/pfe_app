import { createEducationValidator, updateEducationValidator } from '#validators/education'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { EducationService } from '#services/education_service'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'



@inject()
export default class EducationsController {

    constructor(private EducationService: EducationService) { }


    async index({ auth, response }: HttpContext) {


        const user = auth.user
        if (!user) {
           return response.unauthorized(ApiResponse.error("unauthorized"))
        }

        const result = await this.EducationService.getAllCvProfileEducation(user?.account)

        return response.status(result.statusCode).json(result)

    }

    async store({ request, response, auth, params }: HttpContext) {
        try {

            const user = auth.user
            if (!user) {
                return response.unauthorized(ApiResponse.error("unauthorized"))
            }

            const cvProfileId = params.cvProfileId

            const data = await createEducationValidator.validate(request.all())

            const result = await this.EducationService.CreateNewEducation(cvProfileId, data)

            return response.json(result)

        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                   return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
                }
            
                return response
                   .status(500)
                   .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
               
        }
    }


    async edit({ request, response, auth, params }: HttpContext) {
        try {

            const user = auth.user
            if (!user) {
                return response.unauthorized(ApiResponse.error("unauthorized"))
            }

            const educationId = params.educationId

            const data = await updateEducationValidator.validate(request.all())



            const result = await this.EducationService.UpdateEducation(educationId, data)

            return response.status(result.statusCode).json(result)

        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
             }
         
             return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
            
        }
    }

    async destroy({ response, auth, params }: HttpContext) {
        try {

            const user = auth.user
            if (!user) {
                return response.unauthorized(ApiResponse.error("unauthorized"))
            }

            const educationId = params.educationId

             const result=await this.EducationService.DeleteEducation(educationId)

            return response.status(result.statusCode).json(result)

        } catch (error) {
         
             return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
            
        }
    }
}