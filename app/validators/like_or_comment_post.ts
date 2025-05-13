import vine from '@vinejs/vine'

export const likeOrCommentPost=vine.compile(
    vine.object({
        accuntId:vine.number(),
        postId:vine.number()
    })
)