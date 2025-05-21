import ApiResponse from '#models/utils/ApiResponse'
import { ChatService } from '#services/chat_service'
import { CreateChatvalidator, CreateChatMembersvalidator } from '#validators/chat'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'

@inject()
export default class ChatsController {
    constructor(private ChatService: ChatService) { }

    async store({ request, response, auth }: HttpContext) {

        try {
            const user = auth.user

            if (!user || !user.account) {
                return response.status(403).json(ApiResponse.forbidden("Please Complete Your Account Profile"))
            }

            const data = await CreateChatvalidator.validate(request.all())
            const result = await this.ChatService.create(data)

            return response.status(result.statusCode).json(result)
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(
                    ApiResponse.validation('Invalid input', error.messages)
                )
            }

            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }

    async destroy({ params, auth, response }: HttpContext) {
        try {
            if (!auth.user!.account) {
                return response.status(403).json(ApiResponse.forbidden("Please Complete Your Account Profile"))
            }

            let result = null

            if (params.chatId) {
                result = await this.ChatService.delete(params.chatId)
                return response.status(result?.statusCode).json(result)
            }

            return response.status(200).json({ message: 'Ok', success: true })
        } catch (error) {
            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }

    async AddMembers({ request, response, auth }: HttpContext) {

        try {
            const user = auth.user

            if (!user || !user.account) {
                return response.status(403).json(ApiResponse.forbidden("Please Complete Your Account Profile"))
            }

            const data = await CreateChatMembersvalidator.validate(request.all())
            const result = await this.ChatService.createChatMember(data)

            return response.status(result.statusCode).json(result)
        } catch (error) {
            console.log(error);
            
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(
                    ApiResponse.validation('Invalid input', error.messages)
                )
            }

            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }

        async destroyMembers({ params, auth, response }: HttpContext) {
        try {
            if (!auth.user!.account) {
                return response.status(403).json(ApiResponse.forbidden("Please Complete Your Account Profile"))
            }

            let result = null

            if (params.companyId) {
                result = await this.ChatService.deleteMember(params.memberId)
                return response.status(result?.statusCode).json(result)
            }

            return response.status(200).json({ message: 'Ok', success: true })
        } catch (error) {
            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }

    async getChatAccount({ params, auth, response }: HttpContext){
        const accountId=auth.user?.account.id
   
        
        if(!accountId){
            return response.forbidden(ApiResponse.forbidden("Please Complete Your Account Profile"))
        }

        const result= await this.ChatService.getChatsByAccount(accountId)

        return response.status(result.statusCode).json(result)
    }

}
