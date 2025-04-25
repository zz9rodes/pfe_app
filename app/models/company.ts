import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column,belongsTo } from '@adonisjs/lucid/orm'
import { Address } from './utils/index.js'
import Account from './account.js'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name :string

  @column()
  declare industry :string

  @column()
  declare description :string

  @column()
  declare email :string

  @column()
  declare phoneNumber :string

  @column()
  declare address :Address|null

  @column()
  declare firstLangage :string

  @column()
  declare contry :string

  @column()
  declare city :string

  @column()
  declare avatarUrl :string

  @column()
  declare coverUrl :string

  @column()
  declare socialStatus :string

  
  @column()
  declare registrationNnumber :string

  @column()
  declare certificateOfIncorporation :string

  @belongsTo(()=>Account)
  declare admin: BelongsTo<typeof Account>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}