import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { createLinkValidator, updateLinkValidator } from '#validators/link'
import { inject } from '@adonisjs/core'
import { LinkService } from '#services/link_service'
import ApiResponse from '#models/utils/ApiResponse'

@inject()
export default class LinksController {
  constructor(private LinkService: LinkService) {}

  async index({ auth, response }: HttpContext) {
    const user = auth.user
    if (!user) {
      return response.unauthorized(ApiResponse.error('unauthorized'))
    }

    const result = await this.LinkService.getAllCvProfileLink(user?.account)

    return response.status(result.statusCode).json(result)
  }

  async store({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error('unauthorized'))
      }

      const cvProfileId = params.cvProfileId

      const data = await createLinkValidator.validate(request.all())

      const result = await this.LinkService.CreateNewLink(cvProfileId, data)

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

  async edit({ request, response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error('unauthorized'))
      }

      const linkId = params.linkId

      const data = await updateLinkValidator.validate(request.all())

      const result = await this.LinkService.UpdateLink(linkId, data)

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

  async destroy({ response, auth, params }: HttpContext) {
    try {
      const user = auth.user
      if (!user) {
        return response.unauthorized(ApiResponse.error('unauthorized'))
      }

      const linkId = params.linkId

      await this.LinkService.DeleteLink(linkId)

      return response.noContent()
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }
}
