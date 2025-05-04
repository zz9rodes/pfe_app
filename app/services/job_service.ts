

import Job from '#models/job'
import CvProfile from '#models/cv_profile' // Si nécessaire

export class JobService {
  
  async createNewJob(cvProfileId: string | any, data: any) {
    try {
      const cvProfile = await CvProfile.findBy('slug', cvProfileId)

      if (!cvProfile) {
        return { message: "Invalid Profile Id" }
      }

      const job = await Job.create(data)
      // job.related('cvProfile').associate(cvProfile)
      return job
    } catch (error) {
      return { error }
    }
  }

  async updateJob(jobId: number | any, data: any) {
    try {
      const job = await Job.find(jobId)

      if (!job) {
        return { message: "Invalid Job Id" }
      }

      await job.merge(data).save()
      return job
    } catch (error) {
      return { error }
    }
  }

  async deleteJob(jobId: number) {
    try {
      const job = await Job.find(jobId)

      if (job) {
        await job.delete()
      }

      return { message: "ok" }
    } catch (error) {
      return { error }
    }
  }

  async getAllJobs(account: any) {
    if (!account) {
      return { message: "User Don't Have an Account" }
    }

    const jobs = await account.related('jobs').query()
    return jobs
  }
}