import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column,belongsTo, hasMany } from '@adonisjs/lucid/orm'
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

  
  @hasMany(()=>CompanyVersion,{
    foreignKey:'version_id'
  })
  declare details: HasMany<typeof CompanyVersion>

  @column()
  declare isVerify:boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}