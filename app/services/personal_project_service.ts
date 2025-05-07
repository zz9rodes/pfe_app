

import Account from "#models/account"
import CvProfile from "#models/cv_profile"
import PersonalProject from "#models/personal_project"
import ApiResponse from "#models/utils/ApiResponse"
ApiResponse

export class PersonalProjectService {

  async createProject(cvProfileId: string | any, data: any) {

    try {
      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (!cvProfile) {
        return ApiResponse.error("You Need To Complete Your Profile")        
      }

      const projet = await PersonalProject.create(data)
      projet.related('cvProfile').associate(cvProfile)
      return  ApiResponse.success("success",projet)
    } catch (error) {
      return ApiResponse.error(error)
    }
  }

  async updateProject(projectId: number | any, data: any) {
    try {
      const project = await PersonalProject.find(projectId)

      if (!project) {
        return ApiResponse.notFound("Ressources Not Found");
      }

      await project.merge(data).save()

      return ApiResponse.success("success",project)
    } catch (error) {
      return ApiResponse.error(error)
    }
  }

  async deleteProject(projectId: number) {
    try {
      const project = await PersonalProject.find(projectId)

      if (project) {
        await project.delete()
      }

      return { message: "ok" }
    } catch (error) {
      return { error }
    }
  }

  async getAllProjects(account: Account | undefined) {
    if (!account) {
      return ApiResponse.error("You Need To Complete Your Profile");
    }

    const cvProfiles = account.cvProfiles

    if (!cvProfiles) {
      return ApiResponse.error("You Need To Complete Your Profile");
    }

    await cvProfiles.load('personalProjects')
    const projects = cvProfiles.personalProjects

    return ApiResponse.success("success",projects)
  }
}