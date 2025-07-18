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


        const projects = await this.ProjectService.lisCompanieProjetcts(params.companyId)
        return response.status(projects.statusCode).json(projects)
    }

    public async lisGuestCompanieProjetcts({ response, params,auth }: HttpContext) {


        const user=auth.user
        if(!user || !user.account){

            return response.unauthorized(ApiResponse.error(" unauthorized "))

        }

        const projects = await this.ProjectService.lisGuestCompanieProjetcts(params.companyId,user.account)
        return response.status(projects.statusCode).json(projects)
    }

    public async show({ params, response }: HttpContext) {
        const project = await this.ProjectService.get(params.projectId)
        return response.status(project.statusCode).json(project)
    }

    public async showWhitTaks({ params, response }: HttpContext) {
        const project = await this.ProjectService.get(params.projectId,true)
        return response.status(project.statusCode).json(project)
    }

    public async store({ request, response, params }: HttpContext) {

        try {
            const data = await CreateProjectValidator.validate(request.all())
            const project = await this.ProjectService.create(params.companyId, data)
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

    public async getProjectMembers({ params, response }: HttpContext){
         const result = await this.ProjectService.getMembers(params.projectId)

        return response.status(result.statusCode).json(result)
    }
}
