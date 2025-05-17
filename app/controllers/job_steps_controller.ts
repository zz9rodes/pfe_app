

import type { HttpContext } from '@adonisjs/core/http'
import { createJobStepValidationSchema, updateJobStepValidationSchema } from '#validators/job_steps_validation'
import { JobStepsService } from '#services/job_steps_service'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class JobStepsController {

    constructor(private JobStepsService: JobStepsService) { }

    async index({ response,params }: HttpContext) {
        const jobId=params.jobId
        const steps = await this.JobStepsService.getAllJobSteps(jobId)
        return response.ok(steps)
    }

    async show({ params, response }: HttpContext) {
        const step = await this.JobStepsService.getById(params.stepId)
        // if ('message' in step) return response.notFound(step)
        return response.ok(step)
    }

    async store({ request,params, response }: HttpContext) {
        try {

            const jobId=params.jobId
            const payload = await updateJobStepValidationSchema.validate(request.all())
            const step = await this.JobStepsService.create(jobId,payload)
            return response.status(step.statusCode).created(step)

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

    async update({ request, params, response }: HttpContext) {
      

        try {
            
            const data= await updateJobStepValidationSchema.validate(request.all())

            const step = await this.JobStepsService.update(params.stepId, data)

            return response.ok(step)

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

    async destroy({ params, response }: HttpContext) {

        console.log(params.stepId)

        const result = await this.JobStepsService.delete(params.stepId)
        if (result.message === 'Step not found') return response.notFound(result)
        return response.ok(result)
    }
}
