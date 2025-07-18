import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Account from '#models/account'
import SubscriptionPlan from '#models/subscription_plan'
import Subscription from '#models/subscription'
import { DateTime } from 'luxon'
import { AccountType, SubscriptionStatus } from '#models/utils/index'

export default class SubscriptionSeeder extends BaseSeeder {
  public async run() {
    const accounts = await Account.query().where('account_type',AccountType.COMPANIES) // ⚠️ Ajuste selon tes besoins
    const plans = await SubscriptionPlan.all()

    if (accounts.length === 0 || plans.length === 0) {
      console.warn('⚠️ Aucun compte ou plan disponible pour l’association.')
      return
    }

    for (const [i, account] of accounts.entries()) {
      const plan = plans[i % plans.length] // rotation des plans

      const now = DateTime.now()
      const end = now.plus({ days: plan.duration })

      await Subscription.create({
        accountId: account.id,
        subscriptionPlanId: plan.id,
        status: SubscriptionStatus.ACTIVE,
        startDate: now,
        endDate: end,
        paymentReference: `SEED-${account.id}-${plan.id}`,
        isVerified: true,
      })

      console.log(`✔️ Subscription for account ${account.id} → ${plan.name}`)
    }
  }
}
