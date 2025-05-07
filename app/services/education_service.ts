import Account from "#models/account"
import CvProfile from "#models/cv_profile"
import Education from "#models/education"
import ApiResponse from "#models/utils/ApiResponse"

export class EducationService {

  async CreateNewEducation(cvProfileId: string | any, data: any) {
    try {
      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (!cvProfile) {
        return ApiResponse.notFound( "Entity Not Found" )
      }

      const education = await Education.create(data)

      education.related('cvProfile').associate(cvProfile)

      return ApiResponse.success("ok",education)
    } catch (error) {
      return ApiResponse.error( error )
    }
  }


  async UpdateEducation(educationId: number | any, data: any) {
    try {
      const education = await Education.find(educationId)

      if (!education) {
        return ApiResponse.badRequest("Invalid education Id")
      }

      await education.merge(data).save()

      return ApiResponse.success("Ok",education)

    } catch (error) {

      
      return ApiResponse.error("Internal Server Error",error)
    }
  }

  async DeleteEducation(educationId: number) {
    try {
      const education = await Education.find(educationId)

      if (education) {
        await education?.delete()
        return ApiResponse.notFound("Ressources Not Found")  
      }

      return ApiResponse.success("ok")
    } catch (error) {

      return ApiResponse.error("Internal Server Error",error)

    }
  }

  async getAllCvProfileEducation(account: Account | undefined) {



    if (!account) {
      return ApiResponse.notFound("User Don't Have an Account" )
    }

    const cvProfil = account.cvProfiles

    if (!cvProfil) {
      return ApiResponse.notFound("Please Your Profile" )
    }

    await cvProfil.load('educations')

    const educations = cvProfil.educations
    return ApiResponse.success("Ok",educations)
  }

}