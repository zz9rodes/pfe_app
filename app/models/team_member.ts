import { DateTime } from 'luxon'
import { afterFetch, BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Project from './project.js'
import Guest from './guest.js'

export default class TeamMember extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare projectId: number

  @belongsTo(() => Project)
  declare project: BelongsTo<typeof Project>

  @column({ columnName: 'member_id' }) 
  declare memberId: number

  @belongsTo(() => Guest, {
    foreignKey: 'memberId',     
    localKey: 'id',              
  })
  declare member: BelongsTo<typeof Guest>

  @afterFetch()
  static async loadMemberpreloadRelations(members: TeamMember[]) {
    await Promise.all(
      members.map(async (member) => {
        await member.load('member', async (guest) => {
          await guest.preload('account', (accountQuery) => {
            accountQuery.select(['id', 'firstName', 'lastName', 'avatarUrl'])
          })

          guest.select(['role','id'])
        })
      })
    )
  }

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}