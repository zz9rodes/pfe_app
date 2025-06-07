import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'
import { AccountType } from '#models/utils/index'

export const createAccountValidator = vine.compile(
    vine.object({
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
    })
)

export const updateAccountValidator = vine.compile(
  vine.object({
      firstName: vine.string().minLength(2).optional(),
      lastName: vine.string().optional(),
      phoneNumber: vine.string().minLength(7).maxLength(15).optional()
      /*.unique(
          async (db: Database, value: string) => {
          const result = await db.from('accounts').select('id').where('phone_number', value)
          return result.length ? false : true
      }).optional()*/,
      dob: vine.date().nullable().optional(), 
      accountType: vine.enum(AccountType).optional(), 
      country: vine.string().optional(),
      city: vine.string().optional(),
      firstLangage: vine.string().optional(),
      secondLangage: vine.string().optional(),
      avatarUrl: vine.string().url().optional(),
      frontIdCard: vine.string().url().optional(), 
      backIdCard: vine.string().url().optional(), 
  })
)

