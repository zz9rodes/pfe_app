import User from "#models/user";
import EmailEmiterService from "./email_emiter_service.js";
import { inject } from "@adonisjs/core";
import { EmailData } from "#models/utils/index";

@inject()
export default class UserService {

  constructor(private EmailEmiterService: EmailEmiterService) { }

  async Register(data: any) {
    try {

      const user: User = await User.create(data);
      if (user) {
        const data: EmailData = {
          from: 1,
          to: user.id,
          cc: "demo",
          bcc: "account",
          subject: "New User , Complete Your Account Profile",
          text: "email.text",
          html: emailTemplate
        };
        await this.EmailEmiterService.sendEmail(data)
      }
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

      const userEmail = await User.findBy('email', data.email)

      if (!userEmail) {
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

      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '1 days' })

      return { token, user }
    } catch (error) {
      return { error }
    }
  }

  async getUserDetails(id: any) {
    const user = await User.find(id)

    await user?.load('account')
    // await user?.load('profile')
    return user

  }

}

const emailTemplate = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
</head>
<body style="margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #1d4ed8; font-size: 24px;">Bonjour !</h1>
        <p style="font-size: 16px;">Ceci est un exemple d'email utilisant Tailwind CSS.</p>
        <a href="#" style="background-color: #1d4ed8; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Cliquez ici</a>
    </div>
</body>
</html>
`;