import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { Address } from './utils/index.js'

export default class CompanyRequest extends BaseModel {
 @column({ isPrimary: true })
  declare id: number

  @column()
  declare name :string

  @column()
  declare slug :string

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
  declare country :string

  @column()
  declare city :string

  @column()
  declare avatarUrl :string

  @column()
  declare coverUrl :string

  @column()
  declare socialStatus :string

  
  @column()
  declare registrationNumber :string

  @column()
  declare certificateOfIncorporation :string

  @column()
  declare adminId:number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}