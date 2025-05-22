import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from './account.js'
import SubscriptionPlan from './subscription_plan.js'
import { DateTime } from 'luxon'
import { SubscriptionStatus } from './utils/index.js'


export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accountId: number

  @column()
  declare subscriptionPlanId: number

  @column()
  declare status: SubscriptionStatus

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare startDate: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare endDate: DateTime

  @column()
  declare paymentReference: string | null

  @column()
  declare isVerified: boolean

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @belongsTo(() => SubscriptionPlan)
  declare plan: BelongsTo<typeof SubscriptionPlan>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
