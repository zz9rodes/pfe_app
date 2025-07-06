import { DateTime } from 'luxon'
import { afterFetch, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Post from './post.js'
import TeamMember from './team_member.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare text:string

  @column()
  declare authorId: number

  @column()
  declare postId: number

  @belongsTo(() => TeamMember)
  declare author: BelongsTo<typeof TeamMember>

  @belongsTo(() => Post)
  declare post: BelongsTo<typeof Post>

  @afterFetch()
  static async fecthloadDetails(author: TeamMember[]) {
      author.forEach(async (author) => {
        await author.load('member',(member)=>{
          member.preload('account')
        })
      })
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}