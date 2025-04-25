import Account from "#models/account";
import User from "#models/user";
import { ok } from "assert";


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
      return ok
    } catch (error) {
      return error
    }

  }
}