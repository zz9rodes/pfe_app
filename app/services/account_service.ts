import Account from "#models/account";
import User from "#models/user";


export class AccountService {
  // Your code here

  async createAccount(data: any, user: User) {
    try {
      const account: Account = await user.related('account').create({ ...data, slug: crypto.randomUUID() })
      return account
    } catch (error) {
      return error
    }

  }

  async editAccount(data: any, id: any) {
    try {
      const account: Account | null = await Account.find(id)
      if (account) {
        account.fill(data).save()
      }
      return account
    } catch (error) {
      return error
    }

  }

  async destroyAccount(id: any) {
    try {
      const account: Account | null = await Account.find(id)
      if (account) {
        await account.delete()
      }
      return 
    } catch (error) {
      return error
    }

  }

  async getAccount(account_slug:any|string){
      const account: Account | null = await Account.findBy('slug', account_slug)
        let responseData = null
    
        if (account) {
          responseData = account
        }
    
        return responseData
  }
}