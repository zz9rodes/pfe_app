import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'

export const createPersonnalAccountValidator = vine.compile(
    vine.object({
        firstName: vine.string().minLength(2),
        lastName: vine.string().optional(),
        phoneNumber: vine.string().minLength(10).maxLength(15).unique(
            async (db: Database, value: string) => {
            const result = await db.from('accounts').select('id').where('phone_number', value)
            return result.length ? false : true
        }),
        dob: vine.date().nullable().optional(), 
        accountType: vine.enum(['comp', 'type3']), // Remplacez par vos types réels
        country: vine.string().optional(),
        city: vine.string().optional(),
        firstLangage: vine.string(),
        secondLangage: vine.string().optional(),
        avatarUrl: vine.string().url({
            require_protocol: true,
            protocols: ['http','https','ftp']
          }).optional(),
        frontIdcard: vine.string().url({
            require_protocol: true,
            protocols: ['http','https','ftp']
          }).optional(), 
        backIdCard: vine.string().url({
            require_protocol: true,
            protocols: ['http','https','ftp']
          }).optional(), 
    })
)

export const createCompanyAccountValidator = vine.compile(
    vine.object({
        firstName: vine.string().minLength(2),
        lastName: vine.string().optional(),
        phoneNumber: vine.string().minLength(10).maxLength(15).unique(
            async (db: Database, value: string) => {
            const result = await db.from('accounts').select('id').where('phone_number', value)
            return result.length ? false : true
        }),
        dob: vine.date().nullable().optional(), 
        accountType: vine.enum(['comp', 'type3']), // Remplacez par vos types réels
        country: vine.string().optional(),
        city: vine.string().optional(),
        firstLangage: vine.string(),
        secondLangage: vine.string().optional(),
        avatarUrl: vine.string().url({
            require_protocol: true,
            protocols: ['http','https','ftp']
          }),
        frontIdcard: vine.string().url({
            require_protocol: true,
            protocols: ['http','https','ftp']
          }), 
        backIdCard: vine.string().url({
            require_protocol: true,
            protocols: ['http','https','ftp']
          }), 
    })
)