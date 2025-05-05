
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { createJobValidator, updateJobValidator } from '#validators/job'
import { inject } from '@adonisjs/core'
import { JobService } from '#services/job_service'

@inject()
export default class JobsController {
  
  constructor(private jobService: JobService) {}

  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized()
    }

    const account=user.account

    if (!account) {
      return response.forbidden({message:"You Need To Complete you Company Profile"})
    }


    const result = await this.jobService.getAllCompayJobs(account?.company)
    return response.json(result)
  }

  async store({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized()
      }

      const companyId = params.companyId
      const data = await createJobValidator.validate(request.all())
      const result = await this.jobService.createNewJob(companyId, data)

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

      const jobId = params.jobId
      const data = await updateJobValidator.validate(request.all())
      const result = await this.jobService.updateJob(jobId, data)

      return response.json(result)

    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }

  async show({response, params }: HttpContext) {
    try {
      const jobId = params.jobId
      const result = await this.jobService.getJobByJobId(jobId)
      return response.json(result)
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }

  async all({ response }: HttpContext) {
    try {
    

      const result = await this.jobService.getAllJobs()

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

      const jobId = params.jobId
      await this.jobService.deleteJob(jobId)

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