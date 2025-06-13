import type { HttpContext } from '@adonisjs/core/http'

import ApiResponse from '#models/utils/ApiResponse'
import { createSignatureValidator } from '#validators/signature'
import { errors } from '@vinejs/vine'

export default class SignaturesController {
    public async store({ request, response, auth }: HttpContext) {
        try {

            const user = auth.user

            const account = user?.account
            if (!user) {
                return response.unauthorized(ApiResponse.error("You Need To Be Login"))
            }

            if (!account) {
                return response.unauthorized(ApiResponse.error("You Need Complete Your Profile"))
            }


            await account?.load('signatures')


            if (account?.signatures?.length >= 3) {
                return response.badRequest(ApiResponse.badRequest("You Already Have 3 Items , contact Support Teams To Upgrade your Plan"))
            }

            const data = await createSignatureValidator.validate(request.all())

            const signature = await account?.related('signatures').create(data)

            return response
                .status(200)
                .json(ApiResponse.success('Signature are Successfully Create', signature))
                
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
            }

            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }

    public async index({ response, auth }: HttpContext) {
        try {

            const user = auth.user

            const account = user?.account
            if (!user) {
                return response.unauthorized(ApiResponse.error("You Need To Be Login"))
            }

            if (!account) {
                return response.unauthorized(ApiResponse.error("You Need Complete Your Profile"))
            }

            await account?.load('signatures')

            return response
                .status(200)
                .json(ApiResponse.success('Success', account.signatures))

        } catch (error) {

            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
            }

            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }
}
