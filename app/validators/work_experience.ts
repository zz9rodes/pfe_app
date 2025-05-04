import vine from '@vinejs/vine'


export const createWorkExperienceValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(2),
        description:vine.string().optional(),
        company:vine.string().optional(),
        role:vine.string(),
        period:vine.string(),
        year:vine.number().min(1990).max(new Date().getFullYear()),
        website:vine.string().url().optional()
    })
)

export const updateWorkExperienceValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(2).optional(),
        description:vine.string().optional().optional(),
        company:vine.string().optional().optional(),
        role:vine.string().optional(),
        period:vine.string().optional(),
        year:vine.number().min(1990).max(new Date().getFullYear()).optional(),
        website:vine.string().url().optional()
    })
)
