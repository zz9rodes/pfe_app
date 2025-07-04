import { DateTime } from 'luxon'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, hasMany, afterFetch, afterFind } from '@adonisjs/lucid/orm'
import Company from './company.js'
import type { Price } from './utils/index.js'
import JobSteps from './job_steps.js'
import Apply from './apply.js'

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare coverUrl: string

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

  // @column()
  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare price: Price

  // @column()
  // declare details: string | null

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare details: any[]

  @column()
  declare years_experience: number | null

  @column()
  declare skill_required: string 

  @column()
  declare last_date: Date | null

  @column()
  declare gender: string 

  // @column()
  // declare recruitment_steps: string | null

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare recruitment_steps: string

  @column()
  declare status:string
  
  @column()
  declare companyId: number 

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>
  

  @hasMany(() => JobSteps)
  declare stepsValidation: HasMany<typeof JobSteps>

  @hasMany(() => Apply)
  declare applies: HasMany<typeof Apply>

  @afterFetch()
    static async fetchjalon(jobs: Job[]) {
      for (const job of jobs) {
        await job.load('stepsValidation')
        await job.load('company')
      }
  }

  @afterFind()
  static async findjalon(job: Job) {
    await job.load('stepsValidation')
    await job.load('company')
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}