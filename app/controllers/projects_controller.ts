import type { HttpContext } from '@adonisjs/core/http'
import ProjectService from '#services/project_service'
import { CreateProjectValidator, UpdateProjectValidator } from '#validators/project'

import { inject } from '@adonisjs/core'
import ApiResponse from '#models/utils/ApiResponse'
import { errors } from '@vinejs/vine'

@inject()
export default class ProjectsController {
    constructor(private ProjectService: ProjectService) { }

    public async lisCompanieProjetcts({ response, params }: HttpContext) {

        console.log(params.companyId);

        const projects = await this.ProjectService.lisCompanieProjetcts(params.companyId)
        return response.status(projects.statusCode).json(projects)
    }

    public async show({ params, response }: HttpContext) {
        const project = await this.ProjectService.get(params.projectId)
        return response.status(project.statusCode).json(project)
    }

    public async store({ request, response, params }: HttpContext) {
          console.log("dans le controller");

        try {
            const data = await CreateProjectValidator.validate(request.all())
            const project = await this.ProjectService.create(params.companyId, data)
            return response.status(project.statusCode).json(project)
        } catch (error) {
            console.log(error);

            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
            }

            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }

    public async update({ request, params, response }: HttpContext) {
        try {
            const payload = await UpdateProjectValidator.validate(request.all())
            const project = await this.ProjectService.update(params.projectId, payload)
            return response.status(project.statusCode).json(project)
        } catch (error) {

            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
            }
            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }

    public async destroy({ params, response }: HttpContext) {
        const result = await this.ProjectService.delete(params.projectId)

        return response.status(result.statusCode).json(result)
    }
}
