import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Company from './company.js'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string 

  @column()
  declare industries: string 

  @column()
  declare job_type: string

  @column()
  declare total_price: number

  @column()
  declare details: string | null

  @column()
  declare years_experience: number | null

  @column()
  declare skill_required: string 

  @column.dateTime({ autoCreate: true })
  declare last_date: DateTime

  @column()
  declare gender: string 

  @column()
  declare recruitment_steps: string | null

  @column()
  declare company_id: number 

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}