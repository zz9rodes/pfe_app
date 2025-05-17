import vine from '@vinejs/vine'

export const likePost=vine.compile(
    vine.object({
        accountId:vine.number(),
        postId:vine.number()
    })
)

export const CommentPost=vine.compile(
    vine.object({
        accountId:vine.number(),
        postId:vine.number(),
        text:vine.string().minLength(1)
    })
)