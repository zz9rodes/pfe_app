import User from "#models/user";
import EmailEmiterService from "./email_emiter_service.js";
import { inject } from "@adonisjs/core";
import { EmailData } from "#models/utils/index";
import ApiResponse from "#models/utils/ApiResponse";

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

      return ApiResponse.success('User registered successfully', user, 200)

    } catch (error) {
      console.error('Register error:', error)
      return ApiResponse.error('Failed to register user', 'E_USER_REGISTRATION_FAILED', error, 500)
    }

  }


  async edit(id: any, data: any) {
    try {

      const user = await User.find(id);

      if (!user) {
        return ApiResponse.error('Failed to Update user', "E_USER_NOF_FOUND")
      }

      const userEmail = await User.findBy('email', data.email)

      if (!userEmail) {
        user.merge(data);
        await user.save();
      }

      return ApiResponse.success('User Updated successfully', user)
    } catch (error) {
      return ApiResponse.error('Failed to Update user', 'E_USER_UPDATE_FAILED', error)
    }
  }


  async login(payload: any) {
    try {
      const user = await User.verifyCredentials(payload.email, payload.password)

      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '1 days' })

      return ApiResponse.success('User registered successfully', { user, token })

    } catch (error) {
      return ApiResponse.error('Failed to Login user', 'E_USER_LOGIN_FAILED', error)
    }
  }

  async getUserDetails(id: any) {

    try {
      const user = await User.find(id)

      await user?.load('account')

      return ApiResponse.success('success', user, 200)
    } catch (error) {
      ApiResponse.error('Failed Get User Details', "E_USER_DETAILS", error, 500)
    }



  }

  async createUserAccount(data: any) {
    const { user, account } = data

    const newUser = await User.create(user)

    await newUser.related('account').create(account)

    return ApiResponse.success("Success", newUser)
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