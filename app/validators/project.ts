import { File_Type, Priority, ProjectStatus } from '#models/utils/index'
import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'
import { log } from 'console'

export const CreateProjectValidator = vine.compile(
    vine.object({
        name: vine.string(),
        description: vine.string().optional(),
        status: vine.enum(ProjectStatus),
        priority: vine.enum(Priority),
        start: vine.date(),
        objectif: vine.string().optional(),

        managerId: vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('guests').select('*').where('id', value).first()          
            return result!==null && result.accept
        }),

        jobId: vine.number().exists(async (db: Database, value: number) => {
            const result = await db.from('jobs').select('id').where('id', value)
            return result.length === 1
        }).optional(),
        files: vine.array(
            vine.object({
                name: vine.string().minLength(2).optional(),
                type: vine.enum(File_Type),
                url: vine.string().url()
            })
        ).maxLength(3)
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
            const result = await db.from('guests').select('id').where('id', value).first()
            return result!==null  && result.accept
        }).optional(),
        jobId: vine.number().unique(async (db: Database, value: number) => {
            const result = await db.from('guests').select('id').where('id', value)
            return result.length == 1 ? false : true
        }).optional(),
        files: vine.array(
            vine.object({
                name: vine.string().minLength(2).optional(),
                type: vine.enum(File_Type),
                url: vine.string().url()
            })
        ).optional()
    }))