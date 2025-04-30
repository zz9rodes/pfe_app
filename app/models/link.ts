import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import CvProfile from './cv_profile.js'
import { DateTime } from 'luxon'


export default class Link extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare icon: string | null 

  @column()
  declare title: string | null

  @column()
  declare href: string 

  @column()
  declare cvProfileId: number

  @belongsTo(() => CvProfile)
  declare cvProfile: BelongsTo<typeof CvProfile>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
