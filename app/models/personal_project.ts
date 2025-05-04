import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import CvProfile from './cv_profile.js'

export default class PersonalProject extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string 

  @column()
  declare description: string | null

  @column()
  declare website: string |null

  @column()
  declare cvProfileId: number

  @belongsTo(() => CvProfile)
  declare cvProfile: BelongsTo<typeof CvProfile>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
