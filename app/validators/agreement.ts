import vine from '@vinejs/vine'


export const CreateAgreementValidator=vine.compile(
    vine.object({
        accountId:vine.string(),
        contractId:vine.string()
    })
)