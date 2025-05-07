import Job from '#models/job'
import Company from '#models/company'
import { serializeFields, deserializeFields } from '#models/utils/helper'
import ApiResponse from '#models/utils/ApiResponse'

const jsonFields = ['details', 'recruitment_steps', 'price']

export class JobService {

  async createNewJob(companyId: string, data: any) {
    try {
      const company = await Company.findBy('slug', companyId)
      if (!company)  { 
        return  ApiResponse.notFound("message: 'Invalid company Id'")
       }

      data.slug = crypto.randomUUID()
      serializeFields(data, jsonFields)

      const job = await Job.create(data)
      await job.related('company').associate(company)

      deserializeFields(job, jsonFields)
      return ApiResponse.success("success",job)
    } catch (error) {

      return ApiResponse.error(error)
    }
  }

  async updateJob(jobId: number, data: any) {
    try {
      const job = await Job.findBy('slug',jobId)
      if (!job)  {
        return ApiResponse.notFound("Ressources Not Found")
      }

      serializeFields(data, jsonFields)
      await job.merge(data).save()

      deserializeFields(job, jsonFields)
      return ApiResponse.success("success",job)
    } catch (error) {
      return ApiResponse.error(error)
    }
  }


  async deleteJob(jobId: number) {
    try {
      const job = await Job.findBy('slug',jobId)
      if (!job) return { message: 'Job not found' }

      await job.delete()
      return { message: 'ok' }
    } catch (error) {
      return { error }
    }
  }


  async getAllCompayJobs(company: Company) {
    if (!company) {
      return ApiResponse.error("Make sure Your Company is Approved")
    }

    const jobs = await Job.query().where('company_id', company.id)
    deserializeFields(jobs, jsonFields)

    
    return ApiResponse.success("success",jobs)
  }

  async getAllJobs() {
    const jobs = await Job.all()
    deserializeFields(jobs, jsonFields)
    return jobs
  }


  async getJobByJobId(jobId: string) {
    const job = await Job.findBy('slug', jobId)
    if (!job)  {
      return ApiResponse.notFound("Ressources Not Found")
    }
    deserializeFields(job, jsonFields)
    return ApiResponse.success("success",job)
  }
}
