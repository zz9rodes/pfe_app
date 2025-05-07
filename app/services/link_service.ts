import Account from "#models/account"
import CvProfile from "#models/cv_profile"
import Link from "#models/link"
import ApiResponse from "#models/utils/ApiResponse"
import { log } from "util"

export class LinkService {
  
  async CreateNewLink(cvProfileId: string | any, data: any) {
    try {
      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (!cvProfile) {
        return ApiResponse.badRequest("You need To Complete Your Profle")
      }

      const link = await Link.create(data)
      link.related('cvProfile').associate(cvProfile)
      return ApiResponse.success("success",link)
    } catch (error) {
      return ApiResponse.error(error)
    }
  }

  async UpdateLink(linkId: number | any, data: any) {
    try {
      const link = await Link.find(linkId)

      if (!link) {

        return ApiResponse.notFound("Ressource Not Found")
      }

     await link.merge(data).save()

     return ApiResponse.success("success",link)
    } catch (error) {

      return ApiResponse.error(error)
    }
  }

  async DeleteLink(linkId:number){
    try {
      const link = await Link.find(linkId)

      if (link) {
        await link?.delete()
      }

      return {message:"ok"}
    } catch (error) {
      
    }
  }

  async getAllCvProfileLink(account:Account|undefined){


    
      if(!account){
        return ApiResponse.error("Need to Complete Your Profile")
      }

      const cvProfil=account.cvProfiles

      if(!cvProfil){

        return ApiResponse.success("Ok",[])
      }



      
      await cvProfil.load('links')
      
      const links=cvProfil.links

      return ApiResponse.success("",links)
  }
}