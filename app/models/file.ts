import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { File_Type } from './utils/index.js'

export default class File extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name:string

  @column()
  declare type:File_Type

  @column()
  declare url:string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}