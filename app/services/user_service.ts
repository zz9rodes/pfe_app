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


  async edit(id: any, data: any) {
    try {
  
      const user = await User.find(id);
  
      if (!user) {
        console.error(`Aucun utilisateur trouvé avec l'ID : ${id}`);
        return null; 
      }

      const userEmail = await User.findBy('email',data.email)
  
      if(!userEmail){
        console.log("ici on est arriver")
        user.merge(data); 
        await user.save();
      }
  
      return user;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      throw error; 
    }
  }
  

  async login(payload: any) {
    try {
        const user = await User.verifyCredentials(payload.email, payload.password)

        const token=  await User.accessTokens.create(user, ['*'], { expiresIn: '1 days' })

        return {token,user}
    } catch (error) {
      console.log(error)
        return  {error}
    }
  }

  async getUserDetails(id:any){
      const user= await User.find(id)

       await user?.load('account')
      // await user?.load('profile')
    console.log(user)
      return user

  }

}