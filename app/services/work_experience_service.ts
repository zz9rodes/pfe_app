
import Account from "#models/account"
import CvProfile from "#models/cv_profile"
import WorkExperience from "#models/work_experience"

export class WorkExperienceService {

  async createWorkExperience(cvProfileId: string | any, data: any) {


    try {
      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (!cvProfile) {
        return { message: "Invalid Profile Id" }
      }

      const work_experience = await WorkExperience.create(data)
      work_experience.related('cvProfile').associate(cvProfile)
      return work_experience
    } catch (error) {
      return { error }
    }
  }


  async updateWorkExperience(experienceId: number | any, data: any) {
    try {
      const experience = await WorkExperience.find(experienceId)

      if (!experience) {
        return { message: "Invalid Experience Id" }
      }

      await experience.merge(data).save()
      return experience
    } catch (error) {
      return { error }
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
      return { message: "User Don't Have an Account" }
    }

    const cvProfiles = account.cvProfiles

    if (!cvProfiles) {
      return { message: "User Don't Have Work Experiences" }
    }

    await cvProfiles.load('workExperiences')
    const experiences = cvProfiles.workExperiences

    return experiences
  }
}