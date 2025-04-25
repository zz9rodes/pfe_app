import { DateTime } from 'luxon'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column,belongsTo,hasOne } from '@adonisjs/lucid/orm'
import Account from './account.js'
import CompanyVersion from './company_version.js'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug:string
 
  @belongsTo(()=>Account,{
    foreignKey:'admin_id'
  })
  declare admin: BelongsTo<typeof Account>

  
  @hasOne(()=>CompanyVersion,{
    foreignKey:'version_id'
  })
  declare details: HasOne<typeof CompanyVersion>

  @column()
  declare isVerify:boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}