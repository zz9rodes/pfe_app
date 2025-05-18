import type { HttpContext } from '@adonisjs/core/http'
import TaskService from '#services/task_service'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'

export default class TasksController {
    private service = new TaskService()

    public async indexProjectTask({ response, params }: HttpContext) {
        const tasks = await this.service.getAllProjectTask(params.projectId)

        return response.status(tasks.statusCode).json(tasks)
    }

    public async store({ request, response, params }: HttpContext) {
        try {
            const payload = await createTaskValidator.validate(request.all())
            const task = await this.service.create(params.projectId, payload)
            return response.status(task.statusCode).json(task)
        } catch (error) {
            console.log(error);
            return this.handleError(response, error)
        }

    }

    public async update({ request, response, params }: HttpContext) {

        try {
            const payload = await updateTaskValidator.validate(request.all())
            const updated = await this.service.update(params.taskId, payload)
            return response.status(updated.statusCode).json(updated)
        } catch (error) {
            console.log(error);
            return this.handleError(response, error)
        }

    }

    public async destroy({ response, params }: HttpContext) {
        try {
            const result = await this.service.delete(params.taskId)
            return response.status(result.statusCode).json(result)

        } catch (error) {
            return this.handleError(response, error)
        }

    }


    public async show({ response, params }: HttpContext) {
        try {
            const result = await this.service.getTaskDetails(params.taskId)
            return response.status(result.statusCode).json(result)

        } catch (error) {
            return this.handleError(response, error)
        }
    }

    private handleError(response: HttpContext['response'], error: any) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
        }

        return response.status(500).json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
}
