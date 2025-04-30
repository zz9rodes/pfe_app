import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import CvProfile from './cv_profile.js'

export default class Education extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string 

  @column()
  declare institution: string | null

  @column()
  declare degree: string | null

  @column()
  declare year: string 

  @column()
  declare cvProfileId: number

  @belongsTo(() => CvProfile)
  declare cvProfile: BelongsTo<typeof CvProfile>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
