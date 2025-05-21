import { ChatType } from '#models/utils/index'
import { Database } from '@adonisjs/lucid/database'
import vine from '@vinejs/vine'


export const CreateChatvalidator = vine.compile(
    vine.object({
        name: vine.string().optional().requiredWhen('type','=',ChatType.GROUP),
        type: vine.enum(ChatType).optional()
    })
)

export const CreateChatMembersvalidator = vine.compile(
    vine.object({
        chatId: vine.number()
                .exists(async (db: Database, value: number) => {
                const result = await db.from('chats').select('*').where('id', value).first()
                return (result && result.type == ChatType.GROUP) ? true : false
            }).optional().nullable(),

        memberIds: vine.array(
                    vine.number()
                    .exists(async (db: Database, value: number) => {
                const result = await db.from('accounts').select('*').where('id', value).first()
                return result ? true : false
            })
        )
    })
)