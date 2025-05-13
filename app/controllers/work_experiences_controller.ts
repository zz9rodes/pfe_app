

import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { createWorkExperienceValidator, updateWorkExperienceValidator } from '#validators/work_experience'
import { inject } from '@adonisjs/core'
import { WorkExperienceService } from '#services/work_experience_service'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class WorkExperiencesController {

  constructor(private workExperienceService: WorkExperienceService) { }

  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized(ApiResponse.error("unauthorized"))

    }

    const experiences = await this.workExperienceService.getAllWorkExperiences(user?.account)
    return response.status(experiences.statusCode).json(experiences)
  }

  async store({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error("unauthorized"))
      }

      const cvProfileId = params.cvProfileId
      const data = await createWorkExperienceValidator.validate(request.all())

      const result = await this.workExperienceService.createWorkExperience(cvProfileId, data)
      return response.status(result.statusCode).json(result)

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

  async edit({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error("unauthorized"))
      }

      const experienceId = params.experienceId
      const data = await updateWorkExperienceValidator.validate(request.all())

      const result = await this.workExperienceService.updateWorkExperience(experienceId, data)
      return response.status(result.statusCode).json(result)

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

  async destroy({ response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error("unauthorized"))
      }

      const experienceId = params.experienceId
      await this.workExperienceService.deleteWorkExperience(experienceId)

      return response.noContent()

    } catch (error) {
      return response
      .status(500)
      .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))

    }
  }
}