import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { AccountType } from './utils/index.js'

export default class UserRequest extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column() 
  declare email: string

  @column() 
  declare uuid: string

  @column() 
  declare type: AccountType

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}