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

    await newUser.related('account').create({...account,slug:crypto.randomUUID()})

    return ApiResponse.success("Success", newUser)
  }

}

const emailTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Simple</title>
  <style>
    body {
      background-color: #e5e7eb;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 512px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      padding: 32px;
      text-align: center;
    }
    .logo {
      text-align: left;
      font-size: 24px;
      font-weight: bold;
      color: #111827;
      margin-bottom: 24px;
    }
    .logo span {
      color: #ec4899;
    }
    h2 {
      font-size: 24px;
      font-weight: 600;
      color: #111827;
      margin: 0;
    }
    .welcome-text {
      margin-bottom: 16px;
    }
    .invite-text {
      font-size: 14px;
      color: #6b7280;
      margin: 8px 0 32px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #ec4899;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      padding: 12px 24px;
      border-radius: 4px;
      text-decoration: none;
      margin-bottom: 32px;
    }
    .cta-button:hover {
      background-color: #db2777;
    }
    .support {
      margin-bottom: 24px;
    }
    .support p {
      margin: 0;
    }
    .support-title {
      font-size: 14px;
      font-weight: 600;
      color: #374151;
      text-transform: uppercase;
    }
    .support-hours {
      font-size: 12px;
      color: #6b7280;
      margin-top: 4px;
    }
    .team-images {
      display: flex;
      justify-content: center;
      gap: 16px;
    }
    .team-images img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      KindiJob<span>.</span>
    </div>
    <div class="welcome-text">
      <h2>Hey Michael,</h2>
      <h2>welcome to Simple</h2>
    </div>
    <p class="invite-text">James Charlesworth has invited you to collaborate in Simple</p>
    <a href="http://localhost:5173/auth/register" class="cta-button">
      Get Started!
    </a>
    <div class="support">
      <p class="support-title">We are here to help</p>
      <p class="support-hours">Our support 8:30am to 5:00pm AEST Monday to Friday</p>
    </div>
    <div class="team-images">
      <img src="https://i.pinimg.com/736x/ff/c1/c7/ffc1c78e806e456ddd31c333deffff03.jpg" alt="Team Member 1">
    
    </div>
  </div>
</body>
</html>`;