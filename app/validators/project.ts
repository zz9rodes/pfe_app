import { Priority, ProjectStatus } from '#models/utils/index'
import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'

export const CreateProjectValidator = vine.compile(
  vine.object({
    name: vine.string(),
    description: vine.string().optional(),
    status: vine.enum(ProjectStatus),
    priority: vine.enum(Priority),
    start: vine.date(), 
    objectif: vine.string().optional(),

    managerId: vine.number().exists(async (db: Database, value: number) => {
      const result = await db.from('guests').select('id').where('id', value)
      return result.length === 1
    }),

    jobId: vine.number().exists(async (db: Database, value: number) => {
      const result = await db.from('jobs').select('id').where('id', value)
      return result.length === 1
    }).optional(),
  })
)

export const UpdateProjectValidator = vine.compile(
    vine.object({
        name: vine.string().optional(),
        description: vine.string().optional(),
        status: vine.enum(ProjectStatus).optional(),
        priority: vine.enum(Priority).optional(),
        start: vine.date().optional(),
        objectif: vine.string().optional(),
        managerId: vine.number().unique(async (db: Database, value: number) => {
            const result = await db.from('guests').select('id').where('id', value)
            return result.length == 1 ? false : true
        }).optional(),
        jobId: vine.number().unique(async (db: Database, value: number) => {
            const result = await db.from('guests').select('id').where('id', value)
            return result.length == 1 ? false : true
        }).optional(),
    }))