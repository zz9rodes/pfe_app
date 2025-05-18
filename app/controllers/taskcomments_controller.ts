
import type { HttpContext } from '@adonisjs/core/http'
import TaskCommentService from '#services/taskcomment_service'
import { createTaskCommentValidator } from '#validators/task_comment'
import ApiResponse from '#models/utils/ApiResponse'
import { errors } from '@vinejs/vine'


export default class TaskCommentsController {
    protected service = new TaskCommentService()

    public async store({ request, response }: HttpContext) {
        
        try {
            const data = await createTaskCommentValidator.validate(request.all())

            const result = await this.service.create(data)
            return response.status(result.statusCode).json(result)
        } catch (error) {
            console.log(error);
            return this.handleError(response, error)
        }

    }

    public async index({ params, response }: HttpContext) {
        try {
            const comment = await this.service.getAllByTask(params.taskId)
            return response.status(comment.statusCode).json(comment)

        } catch (error) {
            console.log(error);
            return this.handleError(response, error)
        }

    }

    public async destroy({ params }: HttpContext) {
        const commentId = Number(params.commentId)

        return this.service.delete(commentId)
    }

    private handleError(response: HttpContext['response'], error: any) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
        }

        return response.status(500).json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
}
