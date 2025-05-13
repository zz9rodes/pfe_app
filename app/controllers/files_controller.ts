import { createFileValidator } from '#validators/file'
import type { HttpContext } from '@adonisjs/core/http'

import { FileService } from '#services/file_service'
import { inject } from '@adonisjs/core'
import ApiResponse from '#models/utils/ApiResponse'
import { errors } from '@vinejs/vine'

@inject()
export default class FilesController {

    constructor(private FileService: FileService) { }

    async store({ request, response }: HttpContext) {
        try {
            const data = await createFileValidator.validate(request.all())

            const result = await this.FileService.create(data)

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

    async destroy({ params, response }: HttpContext) {
        try {

            const result = await this.FileService.delete(params.fileId)

            return response.status( result.statusCode).json(result)

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
}