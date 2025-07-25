import { DateTime } from 'luxon'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, hasOne, hasMany, afterFind, afterFetch } from '@adonisjs/lucid/orm'
import Account from './account.js'
import CompanyVersion from './company_version.js'
import Job from './job.js'
import Post from './post.js'
import Guest from './guest.js'
import Project from './project.js'
import Contract from './contract.js'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare accountId: number

  @belongsTo(() => Account, {
    foreignKey: 'accountId',
  })
  declare admin: BelongsTo<typeof Account>

  @afterFind()
  static async loadAdmin(company: Company) {
    await company.load('admin')
  }


  @hasMany(() => CompanyVersion, {
    foreignKey: 'company_id',
  })
  declare details: HasMany<typeof CompanyVersion>

  @hasOne(() => CompanyVersion, {
    foreignKey: 'company_id',
    onQuery: (query) => query.where('is_active', true),
  })
  declare activeDetails: HasOne<typeof CompanyVersion>

  @hasMany(() => Job)
  declare jobs: HasMany<typeof Job>

  @hasMany(() => Post)
  declare posts: HasMany<typeof Post>

  @hasMany(() => Project)
  declare projects: HasMany<typeof Project>

  @hasMany(() => Contract)
  declare contracts: HasMany<typeof Contract>

  @hasMany(() => Guest)
  declare guests: HasMany<typeof Guest>

  @column()
  declare isVerify: boolean


  @afterFind()
  static async loadactiveDetails(company: Company) {
    await company.load('activeDetails')
  }

   @afterFetch()
  static async FecthloadactiveDetails(companies: Company[]) {
    for (const company of companies) {
      await company.load('activeDetails')
      await company.load('admin')
    }
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}