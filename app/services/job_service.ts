import Job from '#models/job'
import Company from '#models/company'
import { serializeFields, deserializeFields } from '#models/utils/helper'

const jsonFields = ['details', 'recruitment_steps', 'price']

export class JobService {

  async createNewJob(companyId: string, data: any) {
    try {
      const company = await Company.findBy('slug', companyId)
      if (!company) return { message: 'Invalid company Id' }

      data.slug = crypto.randomUUID()
      serializeFields(data, jsonFields)

      const job = await Job.create(data)
      await job.related('company').associate(company)

      deserializeFields(job, jsonFields)
      return job
    } catch (error) {
      return { error }
    }
  }

  async updateJob(jobId: number, data: any) {
    try {
      const job = await Job.findBy('slug',jobId)
      if (!job) return { message: 'Invalid Job Id' }

      serializeFields(data, jsonFields)
      await job.merge(data).save()

      deserializeFields(job, jsonFields)
      return job
    } catch (error) {
      return { error }
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
      return { message: "User doesn't have a company account" }
    }

    const jobs = await Job.query().where('company_id', company.id)
    deserializeFields(jobs, jsonFields)
    return jobs
  }

  async getAllJobs() {
    const jobs = await Job.all()
    deserializeFields(jobs, jsonFields)
    return jobs
  }


  async getJobByJobId(jobId: string) {
    const job = await Job.findBy('slug', jobId)
    if (!job) return { message: 'Job not found' }

    deserializeFields(job, jsonFields)
    return job
  }
}
