import type { HttpContext } from '@adonisjs/core/http'
import { createLygosGatewayValidator } from '#validators/create_lygos_gateway'
import LygosService from '#services/lygo_service'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'
export default class LygosController {
    protected service = new LygosService()

    public async createGateway({ request, response }: HttpContext) {
        try {
            const payload = await request.validateUsing(createLygosGatewayValidator)

            const result = await this.service.createPaymentGateway(payload)

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


    public async getGateway({ params, response }: HttpContext) {
        try {
            const { gatewayId } = params

            const result = await this.service.getGatewayById(gatewayId)



            return response.status(result.statusCode).json(result)
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(
                    ApiResponse.validation('Invalid input', error.messages)
                )
            }
        }

    }

}
