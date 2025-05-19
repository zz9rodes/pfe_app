import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

export const createTeamMembersvalidator = vine.compile(
    vine.object({
        memberId: vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('guests').select('*').where('id', value).first()

            return result !== null && result.accept
        }),
        projectId: vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('projects').select('id').where('id', value).first()
            return result !== null
        })
    })
)

export const createManyTeamMembersvalidator = vine.compile(
    vine.object({
        membersId: vine.array(vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('guests').select('*').where('id', value).first()
            return result !== null && result.accept
        })
        ),
        projectId:
            vine.number().exists(async (db: Database, value: number) => {
                const result = await db.from('projects').select('id').where('id', value).first()
                return result !== null
            })

    })
)

export const deleteManyTeamMembersValidator = vine.compile(
    vine.object(
        {
            memberIds: vine.array(
                vine.number().exists(async (db: Database, value: number) => {
                    const result = await db.from('team_members').select('id').where('id', value).first()
                    return result !== null 
                })
            )
        }
    )
)