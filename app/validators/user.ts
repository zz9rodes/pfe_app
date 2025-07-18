import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'
import { AccountType } from '#models/utils/index'
import { title } from 'node:process'


export const createUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().unique(async (db: Database, value: string) => {
            const result = await db.from('users').select('id').where('email', value)
            return result.length ? false : true
        }),
        password: vine.string().minLength(9).optional(),
        isAdmin:vine.boolean().optional()
    })
)

export const editUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().optional(),
        password: vine.string().minLength(9).optional(),
    })
)

export const loginUserValidator = vine.compile(
    vine.object({
        email: vine.string().email().exists(async (db: Database, value: string) => {
            const result = await db.from('users').select('*').where('email', value)           
            return result.length == 1 ? true : false
        }),
        password: vine.string()
    })
)

export const createUserAccountValidator=vine.compile(
    vine.object({
        user:vine.object({
            email: vine.string().email().unique(async (db: Database, value: string) => {
                const result = await db.from('users').select('id').where('email', value)
                return result.length ? false : true
            }),
            password: vine.string().minLength(9).optional(),
            isAdmin:vine.boolean().optional()
        }),
        account:vine.object({
        firstName: vine.string().minLength(2),
        lastName: vine.string().minLength(2),
        phoneNumber: vine.string().minLength(7).maxLength(15).unique(
            async (db: Database, value: string) => {
            const result = await db.from('accounts').select('id').where('phone_number', value)
            return result.length ? false : true
        }),
        dob: vine.date().nullable().optional(), 
        accountType: vine.enum(AccountType), 
        country: vine.string().optional(),
        city: vine.string().optional(),
        firstLangage: vine.string(),
        secondLangage: vine.string().optional(),
        avatarUrl: vine.string().url().optional(),
        frontIdCard: vine.string().url().optional(), 
        backIdCard: vine.string().url().optional(), 
        address:vine.object({
            title:vine.string(),
            lat:vine.number(),
            long:vine.number()
        }).optional(),
        roles:vine.string().nullable().optional()

    })
    })
)