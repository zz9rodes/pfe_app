import { DateTime } from 'luxon'
import type {BelongsTo,HasOne} from '@adonisjs/lucid/types/relations'
import { BaseModel, column,belongsTo ,hasOne} from '@adonisjs/lucid/orm'
import { AccountType,Address } from './utils/index.js'
import User from './user.js'
import Company from './company.js'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare slug:string

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

  
  @belongsTo(()=>User)
  declare user: BelongsTo<typeof User>

  @hasOne(() => Company)
  declare account: HasOne<typeof Company>

  @column()
  declare roles:string|null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}