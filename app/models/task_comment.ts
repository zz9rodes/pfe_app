


import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Task from './task.js'
import ProjectTeam from './project_team.js'

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

  @belongsTo(() => ProjectTeam, {
    foreignKey: 'authorId',
    localKey: 'id',
  })
  declare author: BelongsTo<typeof ProjectTeam>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}