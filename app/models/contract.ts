import { BaseModel, column, belongsTo, hasMany, afterFind } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Job from './job.js'
import Company from './company.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Agreement from './agreement.js'

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug:string

  @column()
  declare jobId: number

  @column()
  declare companyId: number

  @column()
  declare textDescription: string

  @column()
  declare title: string

  @hasMany(()=>Agreement)
  declare agreements:HasMany<typeof Agreement>

  // @column()
  // declare articlesAndClauses: string

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare articlesAndClauses: any[]

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => {
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    }
  })
  declare requiredField: string

  @column()
  declare isPublish: boolean

  @belongsTo(() => Job)
  declare job: BelongsTo<typeof Job>

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>



  @afterFind()
  static async loadJob(contract: Contract) {
    await contract.load('job')
    await contract.load('company')
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
