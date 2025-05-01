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
//   declare registrationNnumber :string

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
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
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
  declare registrationNnumber: string

  @column()
  declare certificateOfIncorporation: string

  @column()
  declare isActive: boolean

  @column()
  declare companyId: number

  @belongsTo(() => Company, {
    foreignKey: 'companyId',
  })
  declare company: BelongsTo<typeof Company>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
