import { DateTime } from 'luxon'
import { afterFetch, BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { ChatType } from './utils/index.js'
import Message from './message.js'
import ChatMember from './chat_member.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name?: string

  @column()
  declare type: ChatType

  // @hasOne(()=>Message)
  // declare lastMessage:HasOne<typeof Message>

  @hasOne(() => Message, {
    foreignKey: 'chatId',
  })
  declare lastMessage: HasOne<typeof Message>

  @hasMany(() => Message)
  declare messages: HasMany<typeof Message>

  @hasMany(() => ChatMember)
  declare members: HasMany<typeof ChatMember>


@afterFetch()
static async preloadRelations(chats: Chat[]) {
  await Promise.all(
    chats.map(async (chat) => {
      await chat.load('members')
      await chat.load('lastMessage',async (query) => {
        await query.preload('sender')
      })
      await chat.load('messages', async (query) => {
        await query.preload('sender')
        query.limit(20).orderBy('created_at', 'desc').preload('files')
      })
    })
  )
}


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
