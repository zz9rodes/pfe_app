import Account from "#models/account"
import CvProfile from "#models/cv_profile"
import Education from "#models/education"

export class EducationService {

  async CreateNewEducation(cvProfileId: string | any, data: any) {
    try {
      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (!cvProfile) {
        return { message: "Invalid Profile Id" }
      }

      const education = await Education.create(data)

      education.related('cvProfile').associate(cvProfile)
      return education
    } catch (error) {
      return { error }
    }
  }


  async UpdateEducation(educationId: number | any, data: any) {
    try {
      const education = await Education.find(educationId)

      if (!education) {
        return { message: "Invalid education Id" }
      }

      await education.merge(data).save()

      return education

    } catch (error) {
      return { error }
    }
  }

  async DeleteEducation(educationId: number) {
    try {
      const education = await Education.find(educationId)

      if (education) {
        await education?.delete()
      }

      return { message: "ok" }
    } catch (error) {

    }
  }

  async getAllCvProfileEducation(account: Account | undefined) {



    if (!account) {
      return { message: "User Don't Have an Account" }
    }

    const cvProfil = account.cvProfiles

    if (!cvProfil) {
      return { message: "User Don't Have a Profil Eduactions" }
    }

    await cvProfil.load('educations')

    const educations = cvProfil.educations
    return educations
  }

}