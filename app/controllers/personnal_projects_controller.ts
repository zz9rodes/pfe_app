import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { createProjectValidator, updateProjectValidator } from '#validators/personalproject'
import { inject } from '@adonisjs/core'
import { PersonalProjectService } from '#services/personal_project_service'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class PersonalProjectsController {
  constructor(private personalProjectService: PersonalProjectService) {}

  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized(ApiResponse.error('unauthorized'))
    }

    const projects = await this.personalProjectService.getAllProjects(user?.account)
    return response.status(projects.statusCode).json(projects)
  }

  async store({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error('unauthorized'))
      }

      const cvProfileId = params.cvProfileId
      const data = await createProjectValidator.validate(request.all())

      const result = await this.personalProjectService.createProject(cvProfileId, data)
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

  async edit({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error('unauthorized'))
      }

      const projectId = params.projectId
      const data = await updateProjectValidator.validate(request.all())

      const result = await this.personalProjectService.updateProject(projectId, data)
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
        return response.unauthorized(ApiResponse.error('unauthorized'))
      }

      const projectId = params.projectId
      await this.personalProjectService.deleteProject(projectId)

      return response.noContent()
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }
}
