import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Company from './company.js'
import type { Price } from './utils/index.js'
import JobStepsValidation from './job_steps_validation.js'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare title: string

  @column()
  declare description: string 

  @column()
  declare country: string 

  @column()
  declare city: string 

  @column()
  declare industries: string 

  @column()
  declare job_type: string

  @column()
  declare price: Price

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
  declare status:string
  
  @column()
  declare companyId: number 

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>
  

  @hasMany(() => JobStepsValidation)
  declare stepsValidation: HasMany<typeof JobStepsValidation>
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}