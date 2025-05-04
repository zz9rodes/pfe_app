

import Account from "#models/account"
import CvProfile from "#models/cv_profile"
import PersonalProject from "#models/personal_project"


export class PersonalProjectService {

  async createProject(cvProfileId: string | any, data: any) {

    try {
      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (!cvProfile) {
        return { message: "Invalid Profile Id" }
      }

      const projet = await PersonalProject.create(data)
      projet.related('cvProfile').associate(cvProfile)
      return projet
    } catch (error) {
      return { error }
    }
  }

  async updateProject(projectId: number | any, data: any) {
    try {
      const project = await PersonalProject.find(projectId)

      if (!project) {
        return { message: "Invalid project Id" }
      }

      await project.merge(data).save()

      return project
    } catch (error) {
      return { error }
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
      return { message: "User Don't Have an Account" }
    }

    const cvProfiles = account.cvProfiles

    if (!cvProfiles) {
      return { message: "User Don't Have Projects" }
    }

    await cvProfiles.load('personalProjects')
    const projects = cvProfiles.personalProjects

    return projects
  }
}