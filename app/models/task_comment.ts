


import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Task from './task.js'
import TeamMember from './team_member.js'

export default class TaskComment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare text: string



  @column()
  declare taskId: number

  @belongsTo(() => Task)
  declare task: BelongsTo<typeof Task>

  @column({ columnName: 'author_id' })
  declare authorId: number

  @belongsTo(() => TeamMember, {
    foreignKey: 'authorId',
    localKey: 'id',
  })
  declare author: BelongsTo<typeof TeamMember>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}