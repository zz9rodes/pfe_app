
import Account from "#models/account"
import CvProfile from "#models/cv_profile"
import ApiResponse from "#models/utils/ApiResponse"
import WorkExperience from "#models/work_experience"

export class WorkExperienceService {

  async createWorkExperience(cvProfileId: string | any, data: any) {


    try {
      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (!cvProfile) {
        return ApiResponse.notFound("Ressource Not found")
      }

      const work_experience = await WorkExperience.create(data)
      work_experience.related('cvProfile').associate(cvProfile)
      return ApiResponse.success("success",work_experience)
    } catch (error) {
      return ApiResponse.error(error)
    }
  }


  async updateWorkExperience(experienceId: number | any, data: any) {
    try {
      const experience = await WorkExperience.find(experienceId)

      if (!experience) {
        return ApiResponse.notFound("Ressource Not Found")
      }

      await experience.merge(data).save()
      return ApiResponse.success("success",experience)
    } catch (error) {
      return ApiResponse.error(error)
    }
  }

  async deleteWorkExperience(experienceId: number) {
    try {
      const experience = await WorkExperience.find(experienceId)

      if (experience) {
        await experience.delete()
      }

      return { message: "ok" }
    } catch (error) {
      return { error }
    }
  }

  async getAllWorkExperiences(account: Account | undefined) {
    if (!account) {

      return ApiResponse.error("You Need to Complete Your Account Configuration")
    }

    const cvProfiles = account.cvProfiles

    if (!cvProfiles) {
      return ApiResponse.success("success",[])
    }

    await cvProfiles.load('workExperiences')
    const experiences = cvProfiles.workExperiences

    return ApiResponse.success("sucsess",experiences)
  }
}