import type { HttpContext } from '@adonisjs/core/http'
import { AgreementService } from '#services/agreement_service'
import { inject } from '@adonisjs/core'
import { CreateAgreementValidator } from '#validators/agreement'
import { errors } from '@vinejs/vine'
import { errors as errorAuth } from '@adonisjs/auth'

import ApiResponse from '#models/utils/ApiResponse'
import User from '#models/user'


@inject()
export default class AgreementsController {
    constructor(private AgreementService: AgreementService) { }

    async store({ request, response, auth }: HttpContext) {
        const me = auth.user

        if (!me) {
            return response.unauthorized("unauthorized")
        }

        try {
            const data = await CreateAgreementValidator.validate(request.all())


            await User.verifyCredentials(me.email, data.password)

            const result = await this.AgreementService.create(data)

            return response.status(result.statusCode).json(result)
        } catch (error) {

            if(error instanceof  errorAuth.E_INVALID_CREDENTIALS){
                return response.unauthorized(
                    ApiResponse.badRequest('unauthorized Information')
                )
            }

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

    async show({ params, response }: HttpContext) {
        const result = await this.AgreementService.getAgreementDetails(params?.agreementId)

        return response.status(result.statusCode).json(result)
    }

    async showForAccount({  response ,auth}: HttpContext) {
        const me=auth.user
        me?.load('account')

        if(!me || !me.account){
           return response.unauthorized("unauthorized")
        }

        const result = await this.AgreementService.showForAccount(me.account)

        return response.status(result.statusCode).json(result)
    }

    async showByReference({ params, response }: HttpContext){

         const result = await this.AgreementService.getAgreementDetailsByReference(params?.agreementId)

        return response.status(result.statusCode).json(result)
    }

    async destroy({ params, response }: HttpContext) {
        const result = await this.AgreementService.deleteAgreementDetails(params?.agreementId)

        return response.status(result.statusCode).json(result)
    }
}