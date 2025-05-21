import { afterFetch, afterFind, BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Chat from './chat.js'
import Account from './account.js'
import { DateTime } from 'luxon'
import File from './file.js'
import { after } from 'node:test'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare text: string

  @column()
  declare chatId: number

  @column({ columnName: 'sender_id' })
  declare senderId: number // sender

  // @afterFetch()
  // static async fetchFile(message: Message) {
  //   await message.load('files')
  // }

  // @afterFetch()
  // static async fetchSender(message: Message) {
  //   await message.load('sender')
  // }

  // @afterFind()
  // static async findFile(message: Message) {
  //   await message.load('files')
  // }

  // @afterFind()
  // static async findSender(message: Message) {
  //   await message.load('sender')
  // }

  @belongsTo(() => Chat)
  declare chat: BelongsTo<typeof Chat>

  @belongsTo(() => Account, {
    localKey: 'id',
    foreignKey: 'senderId'
  })
  declare sender: BelongsTo<typeof Account>

  // @hasMany(()=>File)
  // declare files:HasMany<typeof File>


  @manyToMany(() => File, {
    pivotTable: 'file_message',
  })
  declare files: ManyToMany<typeof File>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
