import type { HttpContext } from '@adonisjs/core/http'
import SubscriptionService from '#services/subscription_service'
import { createSubscriptionValidator } from '#validators/subscription_plan'
import ApiResponse from '#models/utils/ApiResponse'
import { errors } from '@vinejs/vine'

export default class SubscriptionsController {
    protected service = new SubscriptionService()

    public async activate({ request, auth, response }: HttpContext) {
        try {
            const user = auth.user
            if (!user || !user.account) {
                return response.unauthorized({ message: 'Unauthorized: account not found' })
            }
            const data = await createSubscriptionValidator.validate(request.all())

            const result = await this.service.activatePlan(data)
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
}
