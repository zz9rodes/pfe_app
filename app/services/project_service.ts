import Company from '#models/company'
import Job from '#models/job'
import Project from '#models/project'
import ApiResponse from '#models/utils/ApiResponse'


export default class ProjectService {
async create(companySlug: string, data: any) {
  const company = await Company.findBy('slug', companySlug)

  if (!company) {
    return ApiResponse.notFound('Company Not Found')
  }

  await company.load('guests')
  await company.load('jobs')

  const { jobId, managerId, ...projectData } = data

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

  await project.load('manager')
  await project.load('job')

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
    const company=await Company.findBy('slug',companyId)

    if(!company){
      return ApiResponse.notFound("Company Not Found")
    }
    const projects = await Project.query().where('company_id', company.id).preload('manager').preload('job')

    return ApiResponse.success("Success", projects)
  }
}
