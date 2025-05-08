import vine from '@vinejs/vine'
import { Database } from '@adonisjs/lucid/database'
import { CurrencyType, JobPriority } from '#models/utils/index'



export const createJobStepValidationSchema = vine.compile(vine.object({
  name: vine.string().trim().minLength(2),

  description: vine.string().trim().minLength(5),

  renumeration: vine.object({
    value: vine.number(),
    currency: vine.enum(CurrencyType)
  }).optional(),

  priority: vine.enum(JobPriority),

  jobId: vine.number().exists(async (db: Database, value: number) => {
    const result = await db.from('jobs').select('*').where('id', value)
    return result.length == 1 ? true : false
  }).optional()
}))

export const createManyJobStepValidationSchema = vine.compile(vine.object({
  steps: vine.array(
    vine.object({
      name: vine.string().trim().minLength(2),

      description: vine.string().trim().minLength(5),

      renumeration: vine.object({
        value: vine.number(),
        currency: vine.enum(CurrencyType)
      }).optional(),

      priority: vine.enum(JobPriority),

      jobId: vine.number().exists(async (db: Database, value: number) => {
        const result = await db.from('jobs').select('*').where('id', value)
        return result.length == 1 ? true : false
      }).optional()

    })
  )
}))

export const updateJobStepValidationSchema = vine.compile(vine.object({
  name: vine.string().trim().minLength(2).optional(),

  description: vine.string().trim().minLength(5).optional(),

  renumeration: vine.object({
    value: vine.number(),
    currency: vine.enum(CurrencyType)
  }).optional(),

  priority: vine.enum(JobPriority).optional()

})
)