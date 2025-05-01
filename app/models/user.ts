import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column ,afterFind, afterFetch} from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { hasOne } from "@adonisjs/lucid/orm";
import type { HasOne } from "@adonisjs/lucid/types/relations";
import Account from './account.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number


  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare isAdmin : boolean

  @hasOne(() => Account)
  declare account: HasOne<typeof Account>

  @afterFind()
  static async loadAccount(user: User) {
    await user.load('account')
  }

  @afterFetch()
  static async loadAccounts(users: User[]) {
    await Promise.all(users.map((user) => user.load('account')))
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)
  
}