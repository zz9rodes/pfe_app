import Guest from "#models/guest"
import Project from "#models/project"
import TeamMember from "#models/team_member"
import ApiResponse from "#models/utils/ApiResponse"

export class TeamMemberService {

  async create(data: any) {
    
    const { memberId, projectId } = data

    const member = await Guest.find(memberId)
    const project = await Project.find(projectId)

    if (member?.companyId !== project?.companyId) {
      return ApiResponse.badRequest("Invalid member or Project")
    }

    const memberTeam = await TeamMember.create({
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
        TeamMember.create({
          memberId: member.id,
          projectId: projectId
        })
      )
    )

    return ApiResponse.success("Members assigned to project successfully", teams)
  }

  async delete(memberId: number) {

    const member = await TeamMember.find(memberId)

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

    const members = await TeamMember.query().whereIn('id', data.memberIds)

    if (members.length === 0) {
      return ApiResponse.notFound("No matching members found")
    }

    await Promise.all(members.map(member => member.delete()))

    return ApiResponse.success("Members deleted successfully", {
      deletedIds: members.map(m => m.id),
    })
  }

  async getProjectMembers(projectId: string) {
    const project = await Project.findBy('slug', projectId)

    if (!project) {
      return ApiResponse.notFound("No Project found")
    }

    await project.load('members', member => {
      member.preload('member', guest => {
        guest.preload('account')
      })
    })

    const teamMembers = project.members

    const membersList = teamMembers.map((teamMember: any) => {
      const account = teamMember.member?.account
      const fullName = account ? `${account.firstName} ${account.lastName}` : ''
      return {
        id: teamMember.id,
        fullName
      }
    })

    return ApiResponse.success("Liste des membres du projet", membersList)
  }
}