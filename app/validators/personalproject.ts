import vine from '@vinejs/vine'



export const createProjectValidator = vine.compile(
    vine.object({
        title:vine.string().minLength(2),
        website:vine.string().url().optional(),
        description:vine.string().optional()
    })
)

export const updateProjectValidator = vine.compile(
    vine.object({
        title:vine.string().minLength(2).optional(),
        website:vine.string().url().optional(),
        description:vine.string().optional()
    })
)