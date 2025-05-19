import { File_Type } from '#models/utils/index'
import type { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

export const createTaskCommentValidator = vine.compile(
    vine.object({
        text: vine.string().minLength(2),
        taskId: vine.number()
            .exists(async (db: Database, value: number) => {
                const task = await db.from('tasks').select('id').where('id', value).first()
                return !!task
            }),
        authorId: vine.number()
            .exists(async (db: Database, value: number) => {
                const task = await db.from('team_members').select('id').where('id', value).first()
                return !!task
            })
    })
)
