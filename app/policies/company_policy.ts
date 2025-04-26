import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { AppRoles } from '#models/utils/index'

export default class CompanyPolicy extends BasePolicy {
    approve_or_desapprove(user: User): AuthorizerResponse {
        user.load('account')

        const isAdmin = user.account.roles == AppRoles.ADMIN

        return isAdmin
    }
}