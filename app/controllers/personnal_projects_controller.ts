

import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { createProjectValidator, updateProjectValidator } from '#validators/personalproject'
import { inject } from '@adonisjs/core'
import { PersonalProjectService } from '#services/personal_project_service'

@inject()
export default class PersonalProjectsController {

  constructor(private personalProjectService: PersonalProjectService) {}

  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized()
    }

    const projects = await this.personalProjectService.getAllProjects(user?.account)
    return response.json(projects)
  }

  async store({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized()
      }

      const cvProfileId = params.cvProfileId
      const data = await createProjectValidator.validate(request.all())

      const result = await this.personalProjectService.createProject(cvProfileId, data)
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
        return response.unauthorized()
      }

      const projectId = params.projectId
      const data = await updateProjectValidator.validate(request.all())

      const result = await this.personalProjectService.updateProject(projectId, data)
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
        return response.unauthorized()
      }

      const projectId = params.projectId
      await this.personalProjectService.deleteProject(projectId)

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