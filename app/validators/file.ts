import { File_Type } from '#models/utils/index'
import vine from '@vinejs/vine'

export const createFileValidator=vine.compile(
    vine.object({
        name:vine.string().minLength(2).optional(),
        type:vine.enum(File_Type),
        url:vine.string().url()
    })
)