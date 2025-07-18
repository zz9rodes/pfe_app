import { DateTime } from 'luxon'
import { afterCreate, afterFind, BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { Priority, ProjectStatus } from './utils/index.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import File from './file.js'
import Guest from './guest.js'
import Job from './job.js'
import Company from './company.js'
import TeamMember from './team_member.js'
import Task from './task.js'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare status: ProjectStatus

  @column()
  declare priority: Priority

  @column()
  declare start: Date

  @column()
  declare objectif: string



  @manyToMany(() => File, {
    pivotTable: 'file_project',
  })
  declare files: ManyToMany<typeof File>

  @afterCreate()
  static async loadFile(project: Project) {
    await project.load('files')
  }

  @afterFind()
  static async findFile(project: Project) {
    await project.load('files')
  }

  @column({ columnName: 'manager_id' }) 
  declare managerId: number

  @belongsTo(() => Guest, {
    foreignKey: 'managerId',     
    localKey: 'id',              
  })
  declare manager: BelongsTo<typeof Guest>

  @column()
  declare jobId?: number

  @belongsTo(() => Job)
  declare job: BelongsTo<typeof Job>


  @column()
  declare companyId: number

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @hasMany(()=>TeamMember)
  declare members:HasMany<typeof TeamMember>

  @hasMany(()=>Task)
  declare tasks:HasMany<typeof Task>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
