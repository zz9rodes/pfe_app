import Apply from '#models/apply'
import ApiResponse from '#models/utils/ApiResponse'
import { ApplyService } from '#services/apply_service'
import { createApplyValidation, updateValidation } from '#validators/apply'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

@inject()
export default class AppliesController {
  constructor(private ApplyService: ApplyService) {}

  async index({ request, response, auth }: HttpContext) {
    try {
      const user = auth.user

      if (!user?.isAdmin) {
        return response.unauthorized(ApiResponse.error('Your Are Not Autohrize'))
      }

      const page = request.input('page', 1)
      const result = await this.ApplyService.GetAllApplyDetails(page)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async jobApplications({ params, response }: HttpContext) {
    try {
      const jobId = params.jobId

      const result = await this.ApplyService.GetAllJobApplications(jobId)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

    async accountApplications({  response,auth }: HttpContext) {
    try {

      const user=auth.user
      if(!user)
      {
        return response.unauthorized(ApiResponse.badRequest("unauthorized"))
      }
      await user.load('account')

      const accountId = user.account.id

      const result = await this.ApplyService.GetAllAccountApplications(accountId)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const applyId = params.applyId

      const result = await this.ApplyService.GetApplyDetails(applyId)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async showUserApply({ response, auth }: HttpContext) {
    try {
      const account = auth.user?.account

      const result = await this.ApplyService.GetAllUserApplies(account)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async store({ request, response }: HttpContext) {
    try {

      const payload = await createApplyValidation.validate(request.all())
      const result = await this.ApplyService.create(payload)
      return response.status(result.statusCode).json(result)
    } catch (error) {

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
      }

      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async setAppliesStatus({ request, params, response }: HttpContext) {
    try {

      const applyId = params.applyId

      const apply = await Apply.findBy('slug', applyId)


      if (!apply) {
        let result = ApiResponse.notFound('Aplication Not Found')
        return response.status(result.statusCode).json(result)
      }

      const payload = await updateValidation.validate(request.all())

      // const {status}=request.body()

      await apply.merge(payload).save()

      let result = ApiResponse.success('Application status has Been Updated', apply)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      console.log(error)

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
      }

      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const result = await this.ApplyService.delete(params.applyId)
      return response.ok(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }
}
