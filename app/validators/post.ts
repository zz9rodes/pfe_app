import { File_Type } from '#models/utils/index'
import vine from '@vinejs/vine'

export const createPostsValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(2),
        type: vine.string().minLength(2),
        text: vine.string().minLength(2).optional(),
        isPublish: vine.boolean(),
        files: vine.array(
            vine.object({
                name: vine.string().minLength(2).optional(),
                type: vine.enum(File_Type),
                url: vine.string().url()
            })
        ),
    })
)

export const editPostsValidator = vine.compile(
    vine.object({
        title: vine.string().minLength(2).optional(),
        type: vine.string().minLength(2).optional(),
        text: vine.string().minLength(2).optional().optional(),
        isPublish: vine.boolean().optional(),
        files: vine.array(
            vine.object({
                name: vine.string().minLength(2).optional(),
                type: vine.enum(File_Type),
                url: vine.string().url()
            })
        ).optional(),
    })
)

export const unPublishPostvalidation = vine.compile(
    vine.object({
        isPublish: vine.boolean()
    })
)