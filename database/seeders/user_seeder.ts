import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { AccountFactory } from '#database/factories/account_factory'

export default class extends BaseSeeder {
  async run() {


    for (let i=0 ; i<5 ; i ++ ) {

        const user=await  UserFactory.create()


        const account= await AccountFactory.merge({ userId: user.id }).create()

        console.log("userId : ",user.id," - accountId : ",account.id)
    }
  }
}
