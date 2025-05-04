import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import { createLinkValidator, updateLinkValidator } from '#validators/link'
import { inject } from '@adonisjs/core'
import { LinkService } from '#services/link_service'



@inject()
export default class LinksController {

  constructor(private LinkService:LinkService){}

  async  index({auth,response}:HttpContext) {
 

        const user=auth.user
        if(!user){
            response.unauthorized()
        }

        const result= await this.LinkService.getAllCvProfileLink(user?.account)

        return   response.json(result)
    
  }

  async store({ request, response, auth ,params}: HttpContext) {
    try {
        
        const user=auth.user
        if(!user){
            response.unauthorized()
        }

        const cvProfileId=params.cvProfileId

        const data= await createLinkValidator.validate(request.all())

        const result= await this.LinkService.CreateNewLink(cvProfileId,data)

        return response.json(result)

    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            return response.status(422).json(error)
          } else {
            return response.internalServerError({ message: 'Internal Server Error.', error })
          }
    }
  }

  async edit({ request, response, auth ,params}: HttpContext) {
    try {
        
        const user=auth.user
        if(!user){
            response.unauthorized()
        }

        const linkId=params.linkId

        const data= await updateLinkValidator.validate(request.all())

        

        const result= await this.LinkService.UpdateLink(linkId,data)

        return response.json(result)

    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }

  async destroy({response, auth ,params}: HttpContext) {
    try {
        
        const user=auth.user
        if(!user){
            response.unauthorized()
        }

        const linkId=params.linkId

        await this.LinkService.DeleteLink(linkId)

        return response.noContent()

    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(error)
      } else {
        return response.internalServerError({ message: 'Internal Server Error.', error })
      }
    }
  }
}