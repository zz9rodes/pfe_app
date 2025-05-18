import { DateTime } from 'luxon'
import { afterCreate, afterFetch, afterFind, BaseModel, belongsTo, column,  hasMany,  manyToMany } from '@adonisjs/lucid/orm'
import File from './file.js'
import type { BelongsTo,  HasMany,  ManyToMany } from '@adonisjs/lucid/types/relations'
import Company from './company.js'
import Comment from './comment.js'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare slug: string

  
  @column()
  declare type: string

  @column()
  declare title: string

  @column()
  declare text: string

  @column()
  declare isPublish: boolean

  @column()
  declare companyId:number

  @belongsTo(() => Company)
  declare company: BelongsTo<typeof Company>

  @hasMany(()=>Comment)
  declare comments:HasMany<typeof Comment>

  @manyToMany(() => File, {
    pivotTable: 'file_post',
  })
  declare files: ManyToMany<typeof File>

  @afterCreate()
  static async loadFile(post:Post){
    await post.load('files')
  }

  @afterFind()
  static async findFile(post:Post){
    await post.load('files')
  }

  @afterFetch()
  static async fetchFile(post:Post){
    await post.load('files')
  }

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}