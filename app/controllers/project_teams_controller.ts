import type { HttpContext } from '@adonisjs/core/http'
import { ProjectTeamService } from '#services/project_team_service'
import { inject } from '@adonisjs/core'
import { createProjectTeamsvalidator, createManyProjectTeamsvalidator, deleteManyProjectTeamsValidator } from '#validators/project_team'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class ProjectTeamsController {
    constructor(private ProjectTeamService: ProjectTeamService) { }

    async store({ request, response }: HttpContext) {
        try {
            const data = await createProjectTeamsvalidator.validate(request.all())
            const result = await this.ProjectTeamService.create(data)
            return response.status(result.statusCode).json(result)
        } catch (error) {
            return this.handleError(response, error)
        }
    }

    async storeMany({ request, response }: HttpContext) {
        try {
            const data = await createManyProjectTeamsvalidator.validate(request.all())
            const result = await this.ProjectTeamService.createMany(data)
            return response.status(result.statusCode).json(result)
        } catch (error) {
            return this.handleError(response, error)
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const result = await this.ProjectTeamService.delete(Number(params.id))
            return response.status(result.statusCode).json(result)
        } catch (error) {
            return this.handleError(response, error)
        }
    }

    async destroyMany({ request, response }: HttpContext) {
        try {
            const memberIds = await deleteManyProjectTeamsValidator.validate(request.all())
            const result = await this.ProjectTeamService.deleteMany(memberIds)
            return response.status(result.statusCode).json(result)
        } catch (error) {
            return this.handleError(response, error)
        }
    }

    // Gestion centralisée des erreurs
    private handleError(response: HttpContext['response'], error: any) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
        }
        return response.status(500).json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
}
