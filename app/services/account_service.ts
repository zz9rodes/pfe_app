import Account from "#models/account";
import User from "#models/user";


export class AccountService {
  // Your code here

  async createPersonnalAccount(data: any, user: User) {
    try {
      const account = await user.related('account').create(data)

      return account
    } catch (error) {
      return error
    }

  }

  async createCompanyAccount(data: any, user: User) {
    try {
      const account = await user.related('account').create(data)

      return account
    } catch (error) {
      return error
    }

  }
}