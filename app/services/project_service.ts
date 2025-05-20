import Company from '#models/company'
import Project from '#models/project'
import ApiResponse from '#models/utils/ApiResponse'
import File from '#models/file';
import TeamMember from '#models/team_member';

export default class ProjectService {
  async create(companySlug: string, data: any) {

    const company = await Company.findBy('slug', companySlug)

    if (!company) {
      return ApiResponse.notFound('Company Not Found')
    }

    await company.load('guests')
    await company.load('jobs')

    const { files, jobId, managerId, ...projectData } = data

    const isManagerValid = company.guests.some((guest) => guest.id === managerId)
    if (!isManagerValid) {
      return ApiResponse.error('Manager is not a guest of this company')
    }

    let validJobId: number | null = null
    if (jobId) {
      const isJobValid = company.jobs.some((job) => job.id === jobId)
      if (!isJobValid) {
        return ApiResponse.error('Job does not belong to this company')
      }
      validJobId = jobId
    }

    const project = await Project.create({
      companyId: company.id,
      slug: crypto.randomUUID(),
      ...projectData,
      managerId,
      jobId: validJobId,
    })

    if (Array.isArray(files) && files.length > 0) {
      const createdFiles = await Promise.all(
        files.map(file => File.create(file))
      )

      const fileIds = createdFiles.map(f => f.id)

      await project.related('files').attach(fileIds)
    }

    await project.load('manager')
    await project.load('job')

    await TeamMember.create({
      memberId: managerId,
      projectId: project.id,
    })

    return ApiResponse.success('Project created successfully', project)
  }


  async update(projectId: string, data: any) {
    const project = await Project.findBy('slug', projectId)

    if (!project) {
      return ApiResponse.notFound('Project Not Found')
    }

    project.merge(data)
    await project.save()
    await project.load('manager')
    await project.load('job')
    return ApiResponse.success('Success', project)
  }

  async get(projectId: string) {
    const project = await Project.findBy('slug', projectId)

    if (!project) {
      return ApiResponse.notFound('Project Not Found')
    }

    await project.load('manager')
    await project.load('job')
    await project.load('files')

    return ApiResponse.success('Success', project)
  }

  async delete(projectId: string) {
    const project = await Project.findBy('slug', projectId)

    if (!project) {
      return ApiResponse.notFound('Project Not Found')
    }

    await project.delete()

    return ApiResponse.success('Project deleted successfully')
  }

  async lisCompanieProjetcts(companyId: number) {
    const company = await Company.findBy('slug', companyId)

    if (!company) {
      return ApiResponse.notFound("Company Not Found")
    }
    const projects = await Project.query().where('company_id', company.id).preload('manager').preload('job')

    return ApiResponse.success("Success", projects)
  }

  async getMembers(projectId: string) {
    const project = await Project.findBy('slug', projectId)

    if (!project) {
      return ApiResponse.notFound('Project Not Found')
    }

    await project.load('members')

    return ApiResponse.success('Success',project)
  }
}
