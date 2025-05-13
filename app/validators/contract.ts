import { requiredField } from '#models/utils/index'
import vine from '@vinejs/vine'

export const createContractValidator = vine.compile(vine.object({
    jobId: vine.number(),
    companyId: vine.number(),
    textDescription: vine.string(),
    title: vine.string().trim().minLength(3),
    articlesAndClauses: vine
        .array(
            vine.object({
                title: vine.string().trim().minLength(1),
                text: vine.string(),
                items: vine.array(
                    vine.string().trim().minLength(1)
                ).minLength(1).optional(),
            })
        )
        .minLength(1).optional(),
    requiredField: vine.array( vine.enum(requiredField)),
    isPublish: vine.boolean().optional(),
})
)


export const updateContractValidator = vine.compile(vine.object({
    jobId: vine.number().optional(),
    companyId: vine.number().optional(),
    textDescription: vine.string().optional(),
    title: vine.string().trim().minLength(3).optional(),
    articlesAndClauses: vine
        .array(
            vine.object({
                title: vine.string().trim().minLength(1),
                text: vine.string(),
                items: vine.array(
                    vine.string().trim().minLength(1)
                ).minLength(1).optional(),
            })
        )
        .minLength(1).optional(),
    requiredField: vine.array( vine.enum(requiredField)).optional(),
    isPublish: vine.boolean().optional(),
})
)