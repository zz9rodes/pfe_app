import Job from '#models/job'
import Company from '#models/company'
import { serializeFields, deserializeFields } from '#models/utils/helper'
import ApiResponse from '#models/utils/ApiResponse'
import { createManyJobStepValidationSchema } from '#validators/job_steps_validation'

const jsonFields = ['details', 'recruitment_steps', 'price']

export class JobService {

  async createNewJob(companyId: string, data: any) {
    try {

      console.log("create new jon")

      const {steps,...companyData}=data
      const company = await Company.findBy('slug', companyId)
      if (!company)  { 
        return  ApiResponse.notFound("message: 'Invalid company Id'")
      }

      companyData.slug = crypto.randomUUID()
      serializeFields(companyData, jsonFields)

      const job = await Job.create(companyData)
      
      if(steps){

        console.log(steps)
        await job.related('stepsValidation').createMany(steps)
        await job.load('stepsValidation')
      }

      await job.related('company').associate(company)

      deserializeFields(job, jsonFields)
      return ApiResponse.success("success",job)
    } catch (error) {

      return ApiResponse.error(error)
    }
  }

  async createManyNewJob(companyId: string, data: any) {
    try {
      const company = await Company.findBy('slug', companyId);
      if (!company) {
        return ApiResponse.notFound("message: 'Invalid company Id'");
      }
  
      const jobsData = data.map((job:Job) => {
        job.slug = crypto.randomUUID();
        serializeFields(job, jsonFields);
        return job;
      });
      
      const jobs = await Job.createMany(jobsData);
  
      await Promise.all(jobs.map(async (job) => {
        await job.related('company').associate(company);
      }));
  
      deserializeFields(jobs, jsonFields);
      return ApiResponse.success("success", jobs);
    } catch (error) {
      console.log(error);
      
      return ApiResponse.error(error);
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

  async getAllJobs(page:number=1) {

    const jobs = await Job.query().select("*").paginate(page,20)
    deserializeFields(jobs, jsonFields)
    return ApiResponse.success("success",jobs)
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
