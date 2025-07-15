import type { HttpContext } from '@adonisjs/core/http'
import { TeamMemberService } from '#services/team_member_service'
import { inject } from '@adonisjs/core'
import { createTeamMembersvalidator, createManyTeamMembersvalidator, deleteManyTeamMembersValidator } from '#validators/project_team'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class TeamMembersController {
    constructor(private TeamMemberService: TeamMemberService) { }

    async store({ request, response }: HttpContext) {
        
        try {
            
            const data = await createTeamMembersvalidator.validate(request.all())

            const result = await this.TeamMemberService.create(data)
            return response.status(result.statusCode).json(result)
        } catch (error) {
            console.log(error);
            
            return this.handleError(response, error)
        }
    }

    async storeMany({ request, response }: HttpContext) {
        try {
            const data = await createManyTeamMembersvalidator.validate(request.all())
            const result = await this.TeamMemberService.createMany(data)
            return response.status(result.statusCode).json(result)
        } catch (error) {
            console.log(error);
            
            return this.handleError(response, error)
        }
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const result = await this.TeamMemberService.delete((params.memberId))
            return response.status(result.statusCode).json(result)
        } catch (error) {
            return this.handleError(response, error)
        }
    }

    async destroyMany({ request, response }: HttpContext) {
        try {
            const memberIds = await deleteManyTeamMembersValidator.validate(request.all())
            const result = await this.TeamMemberService.deleteMany(memberIds)
            return response.status(result.statusCode).json(result)
        } catch (error) {
            console.log(error);
            
            return this.handleError(response, error)
        }
    }

    async getProjectMembers({  response,params }: HttpContext) {
        try {

            const projectId=params.projectId

            const result = await this.TeamMemberService.getProjectMembers(projectId)
            return response.status(result.statusCode).json(result)
        } catch (error) {
            console.log(error);
            
            return this.handleError(response, error)
        }
    }

    private handleError(response: HttpContext['response'], error: any) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
        }

        if(error.code="ER_DUP_ENTRY"){
            return response.status(500).json({message:"Already Exist : Duplicate Entry"})
        }
        return response.status(500).json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
}
