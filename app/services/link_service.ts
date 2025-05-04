import Account from "#models/account"
import CvProfile from "#models/cv_profile"
import Link from "#models/link"
import { log } from "util"

export class LinkService {
  
  async CreateNewLink(cvProfileId: string | any, data: any) {
    try {
      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (!cvProfile) {
        return { message: "Invalid Profile Id" }
      }

      const link = await Link.create(data)
      link.related('cvProfile').associate(cvProfile)
      return link
    } catch (error) {
      return { error }
    }
  }

  async UpdateLink(linkId: number | any, data: any) {
    try {
      const link = await Link.find(linkId)

      if (!link) {
        return { message: "Invalid Link Id" }
      }

     await link.merge(data).save()

     return link
    } catch (error) {
      return { error }
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
        return {message:"User Don't Have an Account"}
      }

      const cvProfil=account.cvProfiles

      if(!cvProfil){
        return {message:"User Don't Have a Profil Links"}
      }



      
      await cvProfil.load('links')
      
      const links=cvProfil.links

      return links
  }
}