import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

export const createProjectTeamsvalidator = vine.compile(
    vine.object({
        memberId: vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('guests').select('id').where('id', value).first()
            return result !== null && result.accept
        }).optional(),
        projetId: vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('projects').select('id').where('id', value).first()
            return result !== null
        }).optional()
    })
)

export const createManyProjectTeamsvalidator = vine.compile(
    vine.object({
        memberId: vine.array(vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('guests').select('id').where('id', value).first()
            return result !== null && result.accept
        }).optional()
        ),
        projetId:
            vine.number().exists(async (db: Database, value: number) => {
                const result = await db.from('projects').select('id').where('id', value).first()
                return result !== null
            }).optional()

    })
)

export const deleteManyProjectTeamsValidator = vine.compile(
    vine.object(
        {
            memberIds: vine.array(vine.number().exists(async (db: Database, value: number) => {
                const result = await db.from('guests').select('id').where('id', value).first()
                return result !== null && result.accept
            }).optional()
            )
        }
    )
)