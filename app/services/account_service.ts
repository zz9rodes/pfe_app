import Account from "#models/account";
import User from "#models/user";


export class AccountService {
  // Your code here

  async createAccount(data: any, user: User) {
    try {
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

    return {account}
  }

  async getAllAccount(){
    const accounts= await Account.all()

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