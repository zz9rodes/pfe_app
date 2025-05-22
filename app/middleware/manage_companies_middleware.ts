import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Subscription from '#models/subscription'
import ApiResponse from '#models/utils/ApiResponse'
import { manageCompaniesVersion } from '#abilities/main'

export default class EnsurePermissionAndSubscription {
  public async handle({ auth, response, params, bouncer }: HttpContext, next: () => Promise<void>) {
    const user = auth.user

    if (!user || !user.account) {
      return response.unauthorized(ApiResponse.error('Unauthorized: Account not found'))
    }

    
    const hasPermission = await bouncer.allows(manageCompaniesVersion, params?.companyId)
    if (!hasPermission) {
      return response.forbidden(ApiResponse.forbidden('Level Permission required'))
    }

    const accountId = user.account.id

    const activeSubscription = await Subscription.query()
      .where('account_id', accountId)
      .where('status', 'ACTIVE')
      .where('end_date', '>', DateTime.now().toSQL())
      .orderBy('end_date', 'desc')
      .first()

    if (!activeSubscription) {
      return response.forbidden(
        ApiResponse.forbidden('You must have an active subscription to access this feature.')
      )
    }

    await next()
  }
}
