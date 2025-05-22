import vine from '@vinejs/vine'
import type { Database } from '@adonisjs/lucid/database'
import { SubscriptionStatus } from '#models/utils/index'



export const createSubscriptionPlanValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    price: vine.number().positive(),
    currency: vine.string().toUpperCase(),   
    duration: vine.number().positive(), 
    features: vine.string().optional(), 
    is_active: vine.boolean().optional(),
  })
)

export const createSubscriptionValidator = vine.compile(
  vine.object({
    accountIid: vine.number()
      .exists(async (db: Database, value: number) => {
        const result = await db.from('accounts').select('id').where('id', value).first()
        return !!result
      }),

    subscriptionPlanId: vine.number()
      .exists(async (db: Database, value: number) => {
        const result = await db.from('subscription_plans').select('id').where('id', value).first()
        return !!result
      }),
    paymentReference: vine.string().optional(),
  })
)

