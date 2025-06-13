import vine from '@vinejs/vine'

export const createSignatureValidator = vine.compile(
    vine.object({
        name:vine.string().minLength(3),
        text:vine.string().minLength(3),
        font:vine.string().minLength(3),
    })
)
    