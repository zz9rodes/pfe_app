import Account from "#models/account";
import User from "#models/user";
import { AccountType } from "#models/utils/index";


export class AccountService {
  // Your code here

  async createAccount(data: any, userId: number) {
    try {
      const user= await User.find(userId)

      if(!user){
        return {
          error: 'Something When Rong',
        }
      }

      await user.load('account')

      if (user.account) {
        return {
          error: 'This user already has an account',
        }
      }

      const account = await user.related('account').create({
        ...data,
        slug: crypto.randomUUID(),
      })

      return account

    } catch (error) {
      console.error(error.message)

      return {
        error: 'An unexpected error occurred while creating the account',
        details: error.message,
      }
    }
  }


  async editAccount(data: any, slug: any) {

    try {
      const account: Account | null = await Account.findBy('slug', slug)
      if (account) {
        account.merge(data).save()
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

  async getAccount(user: User|undefined) {
    await user!.load('account')
    const account = user!.account

    if(account.accountType==AccountType.COMPANIES){
      await account.load('company')
    }

    return {account}
  }

  async getAllAccount(){
    const accounts= await Account.all()

    accounts.forEach( async (account)=>{
      if(account.accountType==AccountType.COMPANIES){
       await  account.load('company', async (company)=>{
          await company.preload('activeDetails')
        })
      }
    })

    return accounts;
  }

  async FindAccountByname(query:string|any){
    let responseData=null
    if(query){
      responseData=   await Account.query()
      .select("*")
      .where('firstName', 'LIKE', `%${query}%`)
      .orWhere('lastName', 'LIKE', `%${query}%`)
      .preload('user',()=>{});
    
    }
    return responseData;
  }
}