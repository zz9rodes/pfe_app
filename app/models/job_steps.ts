import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { Price,Priority } from './utils/index.js'
import Job from './job.js'
import type {BelongsTo} from '@adonisjs/lucid/types/relations'


export default class JobSteps extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string 

   @column()
  declare description: string 


  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare renumeration: Price


  @column()
  declare priority: Priority

  @column()
  declare jobId:number

  @belongsTo(()=>Job)
  declare job: BelongsTo<typeof Job>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}