import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Subscription from './subscription.js'
import { DateTime } from 'luxon'

export default class SubscriptionPlan extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare currency: string

  @column()
  declare duration: number 

  @column()
  declare features: string | null

  @column()
  declare isActive: boolean

  @hasMany(() => Subscription)
  declare subscriptions: HasMany<typeof Subscription>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
