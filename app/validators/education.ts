import vine from '@vinejs/vine'

export const createEducationValidator = vine.compile(
    vine.object({
        title: vine.string(),
        institution:vine.string().minLength(2).optional(),
        degree:vine.string().optional(),
        year:vine.number().min(1990).max(new Date().getFullYear())
    })
)

export const updateEducationValidator = vine.compile(
    vine.object({
        title: vine.string().optional(),
        institution:vine.string().minLength(2).optional(),
        degree:vine.string().optional(),
        year:vine.number().min(1990).max(new Date().getFullYear()).optional()
    })
)