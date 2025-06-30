import User from '#models/user'
import EmailEmiterService from './email_emiter_service.js'
import { inject } from '@adonisjs/core'
import { EmailData } from '#models/utils/index'
import ApiResponse from '#models/utils/ApiResponse'
import UserRequest from '#models/user_request'
import { RenderHtmlWelComePage } from '#models/utils/ViewsTemplate'

@inject()
export default class UserService {
  constructor(private EmailEmiterService: EmailEmiterService) {}

  async Register(data: any) {
    try {
      const user: User = await User.create(data)
      if (user) {
        const data: EmailData = {
          from: 1,
          to: user.id,
          cc: 'demo',
          bcc: 'account',
          subject: 'New User , Complete Your Account Profile',
          text: 'email.text',
          html: RenderHtmlWelComePage('http://localhost:5173/auth/register'),
        }
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
    const user = await User.find(id)

    if (!user) {
      return ApiResponse.error('Failed to Update user', 'E_USER_NOT_FOUND')
    }

    if (data.email) {
      const existingUser = await User.query().where('email', data.email).whereNot('id', id).first()

      if (existingUser) {
        return ApiResponse.error('Email already in use by another user', 'E_EMAIL_IN_USE')
      }
    }

    user.merge(data)
    await user.save()

    return ApiResponse.success('User updated successfully', user)
  } catch (error) {
    console.error(error)
    return ApiResponse.error('Failed to update user', 'E_USER_UPDATE_FAILED', error)
  }
}


  async login(payload: any) {
    try {
      const user = await User.verifyCredentials(payload.email, payload.password)
      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '1 days' })
            
      
      return ApiResponse.success('User registered successfully', { user, token })
    } catch (error) {
      console.log(error);
      
      return ApiResponse.error('Invalid UserName Or Password', 'E_USER_LOGIN_FAILED', error)
    }
  }

  async getUserDetails(id: any) {
    try {
      const user = await User.find(id)

      await user?.load('account')

      return ApiResponse.success('success', user, 200)
    } catch (error) {
      ApiResponse.error('Failed Get User Details', 'E_USER_DETAILS', error, 500)
    }
  }

  async createUserAccount(data: any) {
    const { user, account } = data

    const newUser = await User.create(user)

    await newUser.related('account').create({ ...account, slug: crypto.randomUUID() })
    await  newUser.load('account')
    return ApiResponse.success('Success', newUser)
  }

  async createUserRequest(email: string,type:any) {
    console.log("user request Service")
    try {
      const user: UserRequest = await UserRequest.create({
        email: email,
        type:type,
        uuid: crypto.randomUUID(),
      })
      if (user) {
        const data: EmailData = {
          from: 1,
          to: 1,
          cc: 'Welcom To Kindi Job',
          subject: 'Welcom To Kindi Job',
          text: 'Welcom To Kindi Job',
          html: RenderHtmlWelComePage('http://localhost:5173/auth/register'),
        }
        await this.EmailEmiterService.sendEmail(data)
      }

      return ApiResponse.success('Go and Check Your Email To Corfirm Your Account Request', user, 200)
    } catch (error) {
      console.error('Register error:\n\n',error)
      return ApiResponse.error('Failed to register user', 'E_USER_REGISTRATION_FAILED', error, 500)
    }
  }
}
