import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Account from '#models/account'
import { AccountType, AppRoles } from '#models/utils/index'
import Company from '#models/company'

export default class CompanyVersionPolicy extends BasePolicy {
    
   async  create(user: User, slug: string):Promise< AuthorizerResponse> {
         user.load('account') 
      
        const account = await Account.findBy('slug', slug)
        if (!account) return false
      
        const isMe = user.account.id === account!.id!
        const isCompanyAccount = user.account.accountType === AccountType.COMPANIES
        const isAdmin = user.account.roles === AppRoles.ADMIN
      
        return (isMe && isCompanyAccount) || isAdmin
        return 1==1
      }
      
      
        /**
         * Only the post creator can edit the post
         */
        edit(user: User, company: Company): AuthorizerResponse {
          user.load('account')
  
  
          const isAdmin=user.account.roles == AppRoles.ADMIN
          const isCompanyAdmin=user.account.id===company.admin.id
  
         return isCompanyAdmin || isAdmin
        }
      
        /**
         * Only the post admin can delete the Company
         */
        delete(user: User, company: Company): AuthorizerResponse {
          user.load('account')
  
          return user.account.id===company.admin.id
        }

        other(user: User, slug: string):Promise< AuthorizerResponse> {
            user.load('account') 
         
           const account = await Account.findBy('slug', slug)
           if (!account) return false
         
           const isMe = user.account.id === account!.id!
           const isCompanyAccount = user.account.accountType === AccountType.COMPANIES
           const isAdmin = user.account.roles === AppRoles.ADMIN
         
           return (isMe && isCompanyAccount) || isAdmin
         }
}