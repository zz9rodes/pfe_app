// import { DateTime } from 'luxon'
// import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
// import { BaseModel, column,belongsTo, hasMany } from '@adonisjs/lucid/orm'
// import Account from './account.js'
// import CompanyVersion from './company_version.js'

// export default class Company extends BaseModel {
//   @column({ isPrimary: true })
//   declare id: number

//   @column()
//   declare slug:string
 
//   @column()
//   declare accountId: number
  
//   @belongsTo(() => Account)
//   declare admin: BelongsTo<typeof Account>
  

//   @hasMany(() => CompanyVersion, {
//     foreignKey: 'company_id',
//   })
//   declare details: HasMany<typeof CompanyVersion>
  
//   // @hasMany(()=>CompanyVersion,{
//   //   foreignKey:'id'
//   // })
//   // declare details: HasMany<typeof CompanyVersion>

//   @column()
//   declare isVerify:boolean

//   @column.dateTime({ autoCreate: true })
//   declare createdAt: DateTime

//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   declare updatedAt: DateTime
// }

import { DateTime } from 'luxon'
import type { BelongsTo, HasMany,HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo,hasOne, hasMany, afterFind } from '@adonisjs/lucid/orm'
import Account from './account.js'
import CompanyVersion from './company_version.js'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare accountId: number

  @belongsTo(() => Account, {
    foreignKey: 'accountId', 
  })
  declare admin: BelongsTo<typeof Account>
  

  @hasMany(() => CompanyVersion, {
    foreignKey: 'company_id',
  })
  declare details: HasMany<typeof CompanyVersion>
  
  @hasOne(() => CompanyVersion, {
    foreignKey: 'company_id',
    onQuery: (query) => query.where('is_active', true),
  })
  declare activeDetails: HasOne<typeof CompanyVersion>

  @column()
  declare isVerify: boolean


  @afterFind()
  static async loadAccount(company: Company) {
      await  company.load('activeDetails')
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}