import { DateTime } from 'luxon'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo, hasOne, afterFind, hasMany, afterFetch } from '@adonisjs/lucid/orm'
import { AccountType, Address } from './utils/index.js'
import User from './user.js'
import Company from './company.js'
import CvProfile from './cv_profile.js'
import Guest from './guest.js'
import Subscription from './subscription.js'
import Signature from './signature.js'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare slug: string

  @column()
  declare firstName: string

  @column()
  declare lastName: string | null

  @column()
  declare phoneNumber: string

  @column()
  declare dob: Date | null

  @column()
  declare accountType: AccountType

  @column()
  declare country: string | null

  @column()
  declare city: string | null

  @column()
  declare avatarUrl: string | null

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare address: Address | null

  @column()
  declare firstLangage: string

  @column()
  declare secondLangage: string | null

  @column()
  declare frontIdCard: string | null

  @column({})
  declare backIdCard: string | null

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasOne(() => Company)
  declare company: HasOne<typeof Company>

  @hasOne(() => CvProfile)
  declare cvProfiles: HasOne<typeof CvProfile>

  @hasMany(() => Signature)
  declare signatures: HasMany<typeof Signature>


  @hasMany(() => Guest)
  declare guests: HasMany<typeof Guest>

  @column()
  declare roles: string | null


  @hasMany(() => Subscription)
  declare subscriptions: HasMany<typeof Subscription>

  @afterFind()
  static async loadaDetails(account: Account) {
    await account.load('cvProfiles')
  }

  @afterFetch()
  static async fecthloadDetails(accounts: Account[]) {
    accounts.forEach(async (account) => {
      await account.load('cvProfiles')
    })
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}