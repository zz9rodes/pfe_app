import User from '#models/user'
import CvProfile from '#models/cv_profile'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Account from '#models/account'
import { AppRoles,AccountType } from '#models/utils/index'
import { promises } from 'dns'
import Company from '#models/company'



export default class CvProfilePolicy extends BasePolicy {
  
      create(user: User, account: Account|null): AuthorizerResponse {
    
        user.account.id
        
        const isOwner = user.account.id === account!.id!
        const isCompanyAccount = user.account.accountType === AccountType.COMPANIES
        const isAdmin = user.account.roles === AppRoles.ADMIN
    
        return (isOwner && isCompanyAccount) || isAdmin
      }

        edit(user: User, accountId: number): AuthorizerResponse {
    
        const isOwner = user.account.id === accountId
        const isCompanyAccount = user.account.accountType === AccountType.COMPANIES
        const isAdmin = user.account.roles === AppRoles.ADMIN
    
        return (isOwner && isCompanyAccount) || isAdmin
      }

}