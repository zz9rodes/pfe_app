// export class UserService {
//   // Your code here
// }

import User from "#models/user";

export default class UserService {

  async Register(data:any) {
    try {

      const user= await User.create(data);

      return user
    } catch (error) {
       return error
    }

  }

  async edit(id:any ,data:any) {
    try {

      const user=await User.find(id);

      await  user?.fill(data).save()

      return user
    } catch (error) {
       return error
    }

  }

  async login(payload: any) {
    try {
        const user = await User.verifyCredentials(payload.email, payload.password)

       const token=  await User.accessTokens.create(user, ['*'], { expiresIn: '1 days' })

         return {token,user}
    } catch (error) {
        return  error
    }
  }

}