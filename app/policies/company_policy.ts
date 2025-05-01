import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CompanyPolicy extends BasePolicy {

    approve_or_desapprove(user: User): AuthorizerResponse {
     return user.isAdmin 
   }
   
}