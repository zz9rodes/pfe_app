import { CompanyScope } from '#models/utils/index'
import vine from '@vinejs/vine'


export const createGuestvalidator = vine.compile(
    vine.object(
        {
            companyId: vine.number(),
            accountId: vine.number(),
            role:vine.string(),
            scopes:vine.array(
                vine.enum(CompanyScope)
            )
        }
    )
)