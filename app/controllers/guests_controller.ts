import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GuestService } from '#services/guest_service'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'
import { createGuestvalidator } from '#validators/guest'



@inject()
export default class GuestsController {

    constructor(private GuestService: GuestService) { }


    async store({ request, response }: HttpContext) {
        try {

            const data = await createGuestvalidator.validate(request.all())

            const result = await this.GuestService.createGuest(data)

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

    async destroy({ response, params,auth }: HttpContext) {
        try {

             const user=auth.user
            const result = await this.GuestService.CancelGuest(params.guestId,user?.account.id)

            return response.status(result.statusCode).json(result)

        } catch (error) {
            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))

        }
    }

    async accept({ response, params ,auth}: HttpContext) {
        try {
            const user=auth.user

            const result = await this.GuestService.AcceptGuest(params.guestId,user?.account.id)

            return response.status(result.statusCode).json(result)

        } catch (error) {
            console.log(error);
            
            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))

        }
    }

}