import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'



import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import CvProfile from './cv_profile.js'

export default class WorkExperience extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string 

  @column()
  declare description: string | null

  @column()
  declare company: string | null

  @column()
  declare role: string 

  @column()
  declare period :string

  @column()
  declare year: number |null
  

  @column()
  declare website: string

  @column()
  declare cvProfileId: number

  @belongsTo(() => CvProfile)
  declare cvProfile: BelongsTo<typeof CvProfile>
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
