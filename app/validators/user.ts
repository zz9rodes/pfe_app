import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'


export const createUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().unique(async (db: Database, value: string) => {
            const result = await db.from('users').select('id').where('email', value)
            return result.length ? false : true
        }),
        password: vine.string().minLength(9).optional(),
    })
)

export const editUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().unique(async (db: Database, value: string) => {
            const result = await db.from('users').select('id').where('email', value)
            return result.length ? false : true
        }).optional(),
        password: vine.string().minLength(9).optional(),
    })
)

export const loginUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().exists(async (db: Database, value: string) => {
            const result = await db.from('users').select('id').where('email', value)
            return result.length == 1 ? true : false
        }),
        password: vine.string()
    })
)