import vine from '@vinejs/vine'


export const CreateAgreementValidator=vine.compile(
    vine.object({
        accountId:vine.string(),
        contractId:vine.string(),
        password:vine.string(),
        reference:vine.string(),
        signatureId:vine.number()
    })
)