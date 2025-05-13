import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { PostService } from '#services/post_service'
import { createPostsValidator,unPublishPostvalidation, editPostsValidator } from '#validators/post'
import ApiResponse from '#models/utils/ApiResponse'
import { errors } from '@vinejs/vine'


@inject()
export default class PostsController {

    constructor(private PostService: PostService) { }

    async store({ response, request,params }: HttpContext) {
        try {

            
            const data = await createPostsValidator.validate(request.all())
            const companyId=params.companyId
            
            const result = await this.PostService.create(companyId,data)
            return response.status(result.statusCode).json(result)
        } catch (error) {
            console.log( error)
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

    async edit({ response, request, params }: HttpContext) {
        try {

            const data = await editPostsValidator.validate(request.all())

            const result = await this.PostService.editPost(params?.postId, data)
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

    async destroy({ response, params }: HttpContext) {
        try {


            const result = await this.PostService.delete(params?.postId)
            return response.status(result.statusCode).json(result)
        } catch (error) {
          
            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }

    async unPublishPost({request, params, response }: HttpContext) {

        try {
            const isPublish= await unPublishPostvalidation.validate(request.all())

            const result = await this.PostService.editPost(params.postId, isPublish )

            return response.status(result.statusCode).json(result)
        } catch (error) {
 
            return response
                .status(500)
                .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
        }
    }

    async showPost({params,response}:HttpContext){

        const result= await this.PostService.getPostDetails(params.postId)

        return response.status(result.statusCode).json(result)
    }
    
    async showCompanypost({params,response}:HttpContext){

        const result= await this.PostService.getAllCompaniesPost(params.postId)

        return response.status(result.statusCode).json(result)
    }
}

