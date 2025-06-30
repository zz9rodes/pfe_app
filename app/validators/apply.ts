import vine from '@vinejs/vine'

export const createApplyValidation=vine.compile(
    vine.object({
        accountId:vine.number(),
        jobId:vine.number(),
        message:vine.string(),
        approved:vine.boolean().optional()
    })
)

export const updateValidation=vine.compile(
    vine.object({
        status:vine.string()
    })
)


