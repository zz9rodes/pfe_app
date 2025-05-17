import { DateTime } from 'luxon'
import { afterFind, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Company from './company.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from './account.js'

export default class Guest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare accept: boolean

  @column()
  declare role: string

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare scopes: any[]

  @column()
  declare companyId: number

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @column()
  declare accountId: number

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @afterFind()
  static async loadCompnay(guest: Guest) {
    await guest.load('company')
  }


  @afterFind()
  static async loadaccount(guest: Guest) {
    await guest.load('account')
  }


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}