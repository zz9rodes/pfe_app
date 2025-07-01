import { DateTime } from 'luxon'
import { afterFetch, afterFind, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Account from './account.js'
import Contract from './contract.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Signature from './signature.js'
export default class Agreement extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare reference:string

  @column()
  declare signatureId:number

  @column()
  declare accountId: number

  @belongsTo(() => Account)
  declare account: BelongsTo<typeof Account>

  @belongsTo(() => Signature)
  declare signature: BelongsTo<typeof Signature>

  @column()
  declare contractId: number

  @belongsTo(() => Contract)
  declare contract: BelongsTo<typeof Contract>


  @afterFind()
  static async loadAccount(agreement: Agreement) {
    await agreement.load('account')
  }

  @afterFind()
  static async loadcontract(agreement: Agreement) {
    await agreement.load('contract')
  }

  // @afterFetch()
  // static async fetchcontract(agreement: Agreement) {
  //   await agreement.load('contract')
  // }

  // @afterFetch()
  // static async fetchaccount(agreement: Agreement) {
  //   await agreement?.load('account')
  // }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}