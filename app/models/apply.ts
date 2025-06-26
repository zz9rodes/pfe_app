import { DateTime } from 'luxon'
import { afterFind, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Job from './job.js'
import type  { BelongsTo } from '@adonisjs/lucid/types/relations'
import Account from './account.js'

export default class Apply extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug:string

  @column()
  declare approved:boolean

  @column()
  declare message:string

  @column()
  declare status:string

  @column()
  declare jobId:number

  @belongsTo(()=>Job)
  declare job:BelongsTo<typeof Job>
  

  @column()
  declare accountId:number

  @belongsTo(()=>Account)
  declare account:BelongsTo<typeof Account>

  @afterFind()
  static async loadAccount(apply: Apply) {
      await apply.load("account")
  }

  @afterFind()
  static async loadjob(apply: Apply) {
      await apply.load("job")
  }
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}