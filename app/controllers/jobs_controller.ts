
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { createJobValidator, createManyJobValidator, updateJobValidator } from '#validators/job'
import { inject } from '@adonisjs/core'
import { JobService } from '#services/job_service'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class JobsController {

  constructor(private jobService: JobService) { }

  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized(ApiResponse.error('unauthorized'))
    }

    const account = user.account

    if (!account) {
      return ApiResponse.error("You Need To Complete you profile")
    }


    const result = await this.jobService.getAllCompayJobs(account?.company)
    return response.status(result.statusCode).json(result)
  }

  async store({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error('unauthorized'))
      }

      const companyId = params.companyId
      const data = await createJobValidator.validate(request.all())
      const result = await this.jobService.createNewJob(companyId, data)

      return response.status(result.statusCode).json(result)

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

  async storeMany({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error('unauthorized'))
      }

      const companyId = params.companyId
      const data = await createManyJobValidator.validate(request.all())

      const result = await this.jobService.createManyNewJob(companyId, data['data'])



      return response.status(result.statusCode).json(result)

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

  async edit({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error('unauthorized'))
      }

      const jobId = params.jobId
      const data = await updateJobValidator.validate(request.all())
      const result = await this.jobService.updateJob(jobId, data)

      return response.json(result)

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

  async show({ response, params }: HttpContext) {
    try {
      const jobId = params.jobId
      const result = await this.jobService.getJobByJobId(jobId)
      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async all({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1);

      const result = await this.jobService.getAllJobs(page)

      return response.status(result.statusCode).json(result)

    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))

    }
  }

  async destroy({ response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized()
      }

      const jobId = params.jobId
      await this.jobService.deleteJob(jobId)

      return response.noContent()

    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))

    }
  }
}