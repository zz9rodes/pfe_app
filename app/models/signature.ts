import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Account from './account.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Signature extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name:String

  @column()
  declare accountId:number

  @column()
  declare font:String

  @column()
  declare text:String

  @belongsTo(()=>Account)
  declare account:BelongsTo<typeof Account>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}