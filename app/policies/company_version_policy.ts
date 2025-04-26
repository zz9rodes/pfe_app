import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Account from '#models/account'
import { AccountType, AppRoles } from '#models/utils/index'
import Company from '#models/company'

export default class CompanyVersionPolicy extends BasePolicy {
   create(user: User, account: Account|null): AuthorizerResponse {

    user.account.id


    // const account : Account | null=  Account.findBy('slug', slug)


    const isMe = user.account.id === account!.id!
    const isCompanyAccount = user.account.accountType === AccountType.COMPANIES
    const isAdmin = user.account.roles === AppRoles.ADMIN

    return (isMe && isCompanyAccount) || isAdmin
  }

  /**
   * Only the post creator can edit the post
   */
  edit(user: User, company: Company|null): AuthorizerResponse {
    user.load('account')
    

    const isAdmin = user.account.roles == AppRoles.ADMIN
    const isCompanyAdmin = user.account.id === company!.admin.id

    return isCompanyAdmin || isAdmin
  }

  /**
   * Only the post admin can delete the Company
   */
  delete(user: User, company: Company|null): AuthorizerResponse {
    user.load('account')

    return user.account.id === company!.admin.id
  }

 
}
