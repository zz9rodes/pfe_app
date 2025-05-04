import vine from '@vinejs/vine'

export const createLinkValidator = vine.compile(
    vine.object({
        icon: vine.string().optional(),
        title:vine.string().minLength(2).optional(),
        href:vine.string().url()
    })
)

export const updateLinkValidator = vine.compile(
    vine.object({
        icon: vine.string().optional(),
        title:vine.string().minLength(2).optional(),
        href:vine.string().url().optional()
    })
)