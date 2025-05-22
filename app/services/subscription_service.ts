import SubscriptionPlan from '#models/subscription_plan'
import Subscription from '#models/subscription'
import ApiResponse from '#models/utils/ApiResponse'
import { DateTime } from 'luxon'
import { SubscriptionStatus } from '#models/utils/index'

export default class SubscriptionService {
  public async activatePlan(data:any) {
    const {accountId,subscriptionPlanId,paymentReference}=data
    const plan = await SubscriptionPlan.find(subscriptionPlanId)

    if (!plan || !plan.isActive) {
      return ApiResponse.notFound('Subscription plan not found or inactive')
    }

    // Optionnel : désactiver l’ancien abonnement
    await Subscription.query()
      .where('account_id', accountId)
      .where('status', 'ACTIVE')
      .update({ status: 'CANCELLED' })

    const now = DateTime.now()
    const end = now.plus({ days: plan.duration })

    const subscription = await Subscription.create({
      accountId,
      subscriptionPlanId: plan.id,
      status: SubscriptionStatus.ACTIVE,
      startDate: now,
      endDate: end,
      paymentReference: paymentReference || `MANUAL-${Date.now()}`,
      isVerified: true,
    })

    return ApiResponse.success('Subscription activated successfully', subscription)
  }
}
