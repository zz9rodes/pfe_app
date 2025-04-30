import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import { AppRoles } from '#models/utils/index'

export default class CompanyPolicy extends BasePolicy {
     approve_or_desapprove(user: User): AuthorizerResponse {
        console.log("dans la Policy");
        
        console.log(user.account);

        console.log("apres le log account");
        let isAdmin=false
    
        if(user.account){
             isAdmin = user.account.roles == AppRoles.ADMIN
        }

        return isAdmin
    }
}