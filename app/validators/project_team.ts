import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

export const createProjectTeamsvalidator = vine.compile(
    vine.object({
        memberId: vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('guests').select('*').where('id', value).first()
            console.log(result);

            return result !== null && result.accept
        }),
        projectId: vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('projects').select('id').where('id', value).first()
            return result !== null
        })
    })
)

export const createManyProjectTeamsvalidator = vine.compile(
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

export const deleteManyProjectTeamsValidator = vine.compile(
    vine.object(
        {
            memberIds: vine.array(
                vine.number().exists(async (db: Database, value: number) => {
                    const result = await db.from('project_teams').select('id').where('id', value).first()
                    return result !== null 
                })
            )
        }
    )
)