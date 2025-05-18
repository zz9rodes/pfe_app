import { DateTime } from 'luxon'
import { BaseModel,hasMany, column, belongsTo, manyToMany, afterCreate, afterFind, afterFetch } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany ,HasMany} from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import ProjectTeam from './project_team.js'
import { Priority, ProjectStatus, TaskStatus } from './utils/index.js'
import JobSteps from './job_steps.js'
import File from './file.js'
import TaskComment from './task_comment.js'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare name: string

  @column()
  declare description?: string

  @column()
  declare priority?: Priority

  @column()
  declare startDate?: Date

  @column()
  declare dueDate?: Date

  @column()
  declare estimationTime?: number

  @column()
  declare status: TaskStatus

  @column()
  declare projectId: number

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @column()
  declare assigneeId: number

  @belongsTo(() => ProjectTeam, {
    foreignKey: 'assigneeId',
  })
  declare assignee: BelongsTo<typeof ProjectTeam>

  @column({ columnName: 'step_id' })
  declare stepId?: number

  @belongsTo(() => JobSteps, {
    foreignKey: 'stepId',
    localKey: 'id',
  })
  declare step: BelongsTo<typeof JobSteps>

  @manyToMany(() => File, {
    pivotTable: 'file_task',
  })
  declare attachments: ManyToMany<typeof File>

  
  @hasMany(()=>TaskComment)
  declare comments:HasMany<typeof TaskComment>

  @afterCreate()
  static async loadFile(post: Task) {
    await post.load('attachments')
  }

  @afterFind()
  static async findFile(post: Task) {
    await post.load('attachments')
  }

  @afterFetch()
  static async fetchFile(post: Task) {
    await post.load('attachments')
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
