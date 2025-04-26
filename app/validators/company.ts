import vine from '@vinejs/vine'


export const editCompanyValidator =vine.compile(
    vine.object({
    admin: vine.number().positive().optional() ,
    isVerify: vine.boolean().optional() ,
    details:vine.number().positive().optional()
}))