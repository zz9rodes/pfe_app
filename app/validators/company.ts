import vine from '@vinejs/vine'


export const editCompanyValidator =vine.compile(
    vine.object({
    adminId: vine.string().optional() , //account slug
    isVerify: vine.boolean().optional() ,
    detailId:vine.number().positive().optional() //company version Id
}))