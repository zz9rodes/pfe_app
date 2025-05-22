import SubscriptionPlan from '#models/subscription_plan'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class SubscriptionPlanSeeder extends BaseSeeder {
  public async run() {
    await SubscriptionPlan.createMany([
      {
        name: 'Free',
        price: 0,
        currency: 'XAF',
        duration: 30, // 30 jours gratuits
        features: "this one is just for WorkFinder , All Feeature is free",
        isActive: true,
      },
      {
        name: 'Starter',
        price: 5000,
        currency: 'XAF',
        duration: 30,
        features: JSON.stringify({
          jobs:5,
          projects: 5,
          tasks: 50,
          storage: '1GB',
          support: 'Standard',
        }),
        isActive: true,
      },
      {
        name: 'Pro',
        price: 15000,
        currency: 'XAF',
        duration: 30,
        features: JSON.stringify({
          projects: 'unlimited',
          tasks: 'unlimited',
          storage: '10GB',
          support: 'Premium',
          analytics: true,
        }),
        isActive: true,
      },
    ])
  }
}
