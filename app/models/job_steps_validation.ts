import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { Price,JobPriority } from './utils/index.js'
import Job from './job.js'
import type {BelongsTo} from '@adonisjs/lucid/types/relations'


export default class JobStepsValidation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string 

   @column()
  declare description: string 

  @column()
  declare renumeration?: Price

  @column()
  declare priority: JobPriority

  @column()
  declare jobId:number

  @belongsTo(()=>Job)
  declare job: BelongsTo<typeof Job>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}