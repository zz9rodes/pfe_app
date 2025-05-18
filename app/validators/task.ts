import { File_Type, Priority, TaskStatus } from '#models/utils/index';
import { Database } from '@adonisjs/lucid/database';
import vine from '@vinejs/vine';

export const createTaskValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2),
        description: vine.string().minLength(5).optional(),
        priority: vine.enum(Object.values(Priority)),
        start_date: vine.date().optional(),
        due_date: vine.date().optional(),
        estimation_time: vine.string().optional(),

        status: vine.enum(Object.values(TaskStatus)).optional(),

        assigneeId: vine.number()
            .exists(async (db: Database, value: number) => {
                const result = await db.from('project_teams').select('*').where('id', value).first();

                return result !== null;
            }).optional(),

        stepId: vine.number()
            .exists(async (db: Database, value: number) => {
                const result = await db.from('job_steps').select('id').where('id', value).first();
                return result !== null;
            }).optional(),
        attachements: vine.array(
            vine.object({
                name: vine.string().minLength(2).optional(),
                type: vine.enum(File_Type),
                url: vine.string().url()
            })
        ).optional()

    })
);

export const updateTaskValidator = vine.compile(
    vine.object({
        name: vine.string().minLength(2).optional(),
        description: vine.string().minLength(5).optional(),
        priority: vine.enum(Object.values(Priority)).optional(),
        start_date: vine.date().optional(),
        due_date: vine.date().optional(),
        estimation_time: vine.string().optional(),

        status: vine.enum(Object.values(TaskStatus)).optional(),


        assigneeId: vine.number()
            .exists(async (db: Database, value: number) => {
                const result = await db.from('project_teams').select('*').where('id', value).first();
                return result !== null;
            }).optional(),

        stepId: vine.number()
            .exists(async (db: Database, value: number) => {
                const result = await db.from('job_steps').select('id').where('id', value).first();
                return result !== null;
            }).optional(),
    }))