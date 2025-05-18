import Guest from "#models/guest"
import Project from "#models/project"
import ProjectTeam from "#models/project_team"
import ApiResponse from "#models/utils/ApiResponse"

export class ProjectTeamService {

  async create(data: any) {
    
    const { memberId, projectId } = data

    const member = await Guest.find(memberId)
    const project = await Project.find(projectId)

    if (member?.companyId !== project?.companyId) {
      return ApiResponse.badRequest("Invalid member or Project")
    }

    const memberTeam = await ProjectTeam.create({
      memberId: memberId,
      projectId: projectId
    })
    return ApiResponse.success("Success", memberTeam)
  }

  async createMany(data: any) {
    const { membersId, projectId } = data

    const project = await Project.find(projectId)
    if (!project) {
      return ApiResponse.notFound("Project not found")
    }

    await project.load('company')

    const members = await Guest.query().whereIn('id', membersId)

    const validMembers = members.filter(
      (member) => member.companyId === project.companyId
    )

    if (validMembers.length === 0) {
      return ApiResponse.badRequest("No valid members for this project")
    }

    const teams = await Promise.all(
      validMembers.map((member) =>
        ProjectTeam.create({
          memberId: member.id,
          projectId: projectId
        })
      )
    )

    return ApiResponse.success("Members assigned to project successfully", teams)
  }

  async delete(memberId: number) {

    const member = await ProjectTeam.find(memberId)

    if (!member) {
      return ApiResponse.notFound("Ressource Not Found")
    }

    await member.delete()
    return ApiResponse.success("Delete Succesfully")
  }

  async deleteMany(data:any) {
    
    if (!data || !Array.isArray(data.memberIds) || data.memberIds.length === 0) {
      return ApiResponse.badRequest("No member IDs provided")
    }

    const members = await ProjectTeam.query().whereIn('id', data.memberIds)

    if (members.length === 0) {
      return ApiResponse.notFound("No matching members found")
    }

    await Promise.all(members.map(member => member.delete()))

    return ApiResponse.success("Members deleted successfully", {
      deletedIds: members.map(m => m.id),
    })
  }
}