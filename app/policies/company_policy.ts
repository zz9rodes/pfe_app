import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CompanyPolicy extends BasePolicy {

    approve_or_desapprove(user: User): boolean {
      console.log(user.isAdmin)
      return  user.isAdmin
    }
  }
  
   
