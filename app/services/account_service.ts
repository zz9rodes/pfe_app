import Account from "#models/account"
import User from "#models/user"
import { AccountType } from "#models/utils/index"
import ApiResponse from "#models/utils/ApiResponse"
export class AccountService {

  async createAccount(data: any, userId: number) {
    try {
      const user = await User.find(userId)
      if (!user) {
        return ApiResponse.error('User not found', 'E_USER_NOT_FOUND')
      }

      await user.load('account')
      if (user.account) {
        return ApiResponse.error('This user already has an account', 'E_ACCOUNT_EXISTS')
      }

      const account = await user.related('account').create({
        ...data,
        slug: crypto.randomUUID(),
      })

      return ApiResponse.success('Account created successfully', account)
    } catch (error) {
      return ApiResponse.error(
        'An unexpected error occurred while creating the account',
        'E_CREATE_ACCOUNT_ERROR',
        error
      )
    }
  }

  async editAccount(data: any, slug: string) {

    
    
    
    try {
      const account = await Account.findBy('slug', slug)
      if (!account) {
        return ApiResponse.error('Account not found', 'E_ACCOUNT_NOT_FOUND')
      }

      await account.merge(data).save()
      return ApiResponse.success('Account updated successfully', account)
    } catch (error) {
      return ApiResponse.error('Error updating account', 'E_UPDATE_ACCOUNT_ERROR', error)
    }
  }

  async destroyAccount(accountId: number) {
    try {
      const account = await Account.find(accountId)
      if (!account) {
        return ApiResponse.error('Account not found', 'E_ACCOUNT_NOT_FOUND')
      }

      await account.delete()
      return ApiResponse.success('Account deleted successfully')
    } catch (error) {
      return ApiResponse.error('Error deleting account', 'E_DELETE_ACCOUNT_ERROR', error)
    }
  }

  async getAccount(user: User | undefined) {
    if (!user) {
      return ApiResponse.error('User not provided', 'E_NO_USER')
    }

    await user.load('account')
    const account = user.account

    if (account.accountType === AccountType.COMPANIES) {
      await account.load('company')
    }

    await account.load('signatures')

    return ApiResponse.success('Account retrieved successfully', account)
  }

  async getAllAccount(isAdmin:boolean=false) {
    const accounts =  await Account.all() 
    const activeAccounts=[];

    for (const account of accounts) {
      if (account.accountType === AccountType.COMPANIES) {
        await account.load('company', async (company) => {
          await company.preload('activeDetails')
        })
      }
      await account.load('user')

      if (isAdmin) {
          await account.load('cvProfiles')
      }

      if(account.cvProfiles){
        activeAccounts.push(account)
      }
    }

    return ApiResponse.success('All accounts retrieved', activeAccounts,200)
  }

  async findAccountByName(query: string) {
    if (!query || query.trim() === '') {
      return ApiResponse.error('Query is empty', 'E_EMPTY_QUERY')
    }

    const results = await Account.query()
      .where('firstName', 'LIKE', `%${query}%`)
      .orWhere('lastName', 'LIKE', `%${query}%`)
      .preload('user')

    return ApiResponse.success('Search results', results)
  }

  async getAccountshowGuest(user: User | undefined) {
    if (!user) {
      return ApiResponse.error('User not provided', 'E_NO_USER')
    }

    await user.load('account')
    const account = user.account

    // if (account.accountType === AccountType.COMPANIES) {
    //   await account.load('company')
    // }

    await account.load('guests',(guest)=>{
      guest.preload('company')
    })

    const guestList=account.guests

    return ApiResponse.success('Account retrieved successfully', guestList)
  }
}
