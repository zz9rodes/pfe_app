

import type { HttpContext } from '@adonisjs/core/http'
import { createJobStepValidationSchema, updateJobStepValidationSchema } from '#validators/job_steps_validation'
import { JobStepsValidationService } from '#services/job_steps_validation_service'
import { inject } from '@adonisjs/core'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class JobStepsValidationController {

    constructor(private JobStepsValidationService: JobStepsValidationService) { }

    async index({ response,params }: HttpContext) {
        const jobId=params.jobId
        const steps = await this.JobStepsValidationService.getAllJobStepsValidation(jobId)
        return response.ok(steps)
    }

    async show({ params, response }: HttpContext) {
        const step = await this.JobStepsValidationService.getById(params.stepId)
        // if ('message' in step) return response.notFound(step)
        return response.ok(step)
    }

    async store({ request,params, response }: HttpContext) {
        try {

            const jobId=params.jobId
            const payload = await updateJobStepValidationSchema.validate(request.all())
            const step = await this.JobStepsValidationService.create(jobId,payload)
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

            const step = await this.JobStepsValidationService.update(params.stepId, data)

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

        const result = await this.JobStepsValidationService.delete(params.stepId)
        if (result.message === 'Step not found') return response.notFound(result)
        return response.ok(result)
    }
}
