import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Subscription from '#models/subscription'
import ApiResponse from '#models/utils/ApiResponse'
import { manageCompaniesVersion } from '#abilities/main'
import { AccountType } from '#models/utils/index'

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

    console.log("dans cette verification")

    const accountId = user.account.id

    console.log(accountId)


    const activeSubscription = await Subscription.query()
      .where('account_id', accountId)
      .where('status', 'ACTIVE')
      .where('end_date', '>', DateTime.now().toSQL())
      .orderBy('end_date', 'desc')
      .first()


    console.log(activeSubscription?.id)
        console.log(activeSubscription?.startDate)

            console.log(activeSubscription?.endDate)


    if (!activeSubscription && user.account.accountType!==AccountType.PERSONNAL) {
      return response.forbidden(
        ApiResponse.forbidden('You must have an active subscription to access this feature.')
      )
    }

    console.log("on a traverser ici");
    

    await next()
  }
}
