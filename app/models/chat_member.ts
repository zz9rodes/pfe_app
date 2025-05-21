import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Chat from './chat.js'
import Account from './account.js'
import { DateTime } from 'luxon'

export default class ChatMember extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({columnName:'member_id'})
  declare memberId: number

  @column()
  declare chatId: number

  @belongsTo(() => Account,{
    foreignKey:'memberId',
    localKey:'id'
  })
  declare account: BelongsTo<typeof Account>

  @belongsTo(() => Chat)
  declare chat: BelongsTo<typeof Chat>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
