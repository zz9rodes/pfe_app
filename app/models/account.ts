import { DateTime } from 'luxon'
import type {HasOne} from '@adonisjs/lucid/types/relations'
import { BaseModel, column,hasOne } from '@adonisjs/lucid/orm'
import { AccountType,Address } from './utils/index.js'
import User from './user.js'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName:string 

  @column()
  declare lastName:string |null

  @column()
  declare phoneNumber:string 

  @column()
  declare dob: Date  | null

  @column()
  declare accountType: AccountType

  @column()
  declare country: string|null

  @column()
  declare city: string|null

  @column()
  declare avatarUrl: string|null

  
  @column()
  declare address: Address|null

  @column()
  declare firstLangage: string

  @column()
  declare secondLangage: string|null

  @column()
  declare frontIdcard: string|null

  @column({})
  declare backIdCard: string|null

  
  @hasOne(()=>User)
  declare user: HasOne<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}