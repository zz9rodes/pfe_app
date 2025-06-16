import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { GuestService } from '#services/guest_service'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'
import { createGuestvalidator } from '#validators/guest'
import User from '#models/user'
import Company from '#models/company'



@inject()
export default class GuestsController {

    constructor(private GuestService: GuestService) { }


    async storeApi({ request, response }: HttpContext) {
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

    async store({ request, response }: HttpContext) {
        try {

            const {email,companyId,role,scopes} =request.body()

            const user= await User.findBy('email',email)

            const company=await Company.findBy('slug',companyId)

            console.log(company?.id)
            console.log(user?.id)
            if(!user || !company){
                return response.badRequest(ApiResponse.badRequest('Invalid Companie or Account '))
            }

            const paylod={
                "companyId": user.accountId,
                "accountId": company.id,
                "role": role,
                "scopes": scopes
                }

            console.log(paylod)

            const data = await createGuestvalidator.validate(paylod)

            const result = await this.GuestService.createGuest(data)

            return response.status(result.statusCode).json(result)
        } catch (error) {
            console.log(error)
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

    async listGuest({ response, params }: HttpContext) {
        try {

            const companyId=params.companyId
            const result = await this.GuestService.listGuest(companyId)

            return response.status(result.statusCode).json(result)

        } catch (error) {
            console.log(error);
            
            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))

        }
    }

}