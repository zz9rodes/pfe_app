// import { DateTime } from 'luxon'
// import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
// import { Address } from './utils/index.js'
// import Company from './company.js'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'

// export default class CompanyVersion extends BaseModel {
//  @column({ isPrimary: true })
//   declare id: number

//   @column()
//   declare name :string

//   @column()
//   declare industry :string

//   @column()
//   declare description :string

//   @column()
//   declare email :string

//   @column()
//   declare phoneNumber :string

//   @column()
//   declare address :Address|null

//   @column()
//   declare firstLangage :string

//   @column()
//   declare country :string

//   @column()
//   declare city :string

//   @column()
//   declare avatarUrl :string

//   @column()
//   declare coverUrl :string

//   @column()
//   declare socialStatus :string


//   @column()
//   declare registrationNumber :string

//   @column()
//   declare certificateOfIncorporation :string

//   @belongsTo(()=>Company)
//   declare company:BelongsTo<typeof Company>

//   @column()
//   declare isActive: boolean

//   @column.dateTime({ autoCreate: true })
//   declare createdAt: DateTime

//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   declare updatedAt: DateTime
// }

import { DateTime } from 'luxon'
import { afterFind, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { Address } from './utils/index.js'
import Company from './company.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class CompanyVersion extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare industry: string

  @column()
  declare description: string

  @column()
  declare email: string

  @column()
  declare phoneNumber: string

  @column()
  declare address: Address | null

  @column()
  declare firstLangage: string

  @column()
  declare country: string

  @column()
  declare city: string

  @column()
  declare avatarUrl: string

  @column()
  declare coverUrl: string

  @column()
  declare socialStatus: string

  @column()
  declare registrationNumber: string

  @column()
  declare certificateOfIncorporation: string

  @column()
  declare isActive: boolean


  @column({ columnName: 'company_id' })
  declare company_id: number

  @belongsTo(() => Company, {
    foreignKey: 'company_id',
  })
  declare company: BelongsTo<typeof Company>


    @afterFind()
    static async loadAccount(companyVersion: CompanyVersion) {
        await  companyVersion.load('company')
    }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
