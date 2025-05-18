import Job from '#models/job'
import Company from '#models/company'
import ApiResponse from '#models/utils/ApiResponse'


export class JobService {

  async createNewJob(companyId: string, data: any) {
    try {


      const {steps,...jobData}=data
      const company = await Company.findBy('slug', companyId)
      if (!company)  { 
        return  ApiResponse.notFound("message: 'Invalid company Id'")
      }

      jobData.slug = crypto.randomUUID()

      const job = await Job.create(jobData)
      
      if(steps){

        await job.related('stepsValidation').createMany(steps)
        await job.load('stepsValidation')
      }

      await job.related('company').associate(company)

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
        return job;
      });
      
      const jobs = await Job.createMany(jobsData);
  
      await Promise.all(jobs.map(async (job) => {
        await job.related('company').associate(company);
      }));
  
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

      await job.merge(data).save()

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

    
    return ApiResponse.success("success",jobs)
  }

  async getAllJobs(page:number=1) {

    const jobs = await Job.query().select("*").paginate(page,20)
    return ApiResponse.success("success",jobs)
  }



  async getJobByJobId(jobId: string) {
    const job = await Job.findBy('slug', jobId)
    if (!job)  {
      return ApiResponse.notFound("Ressources Not Found")
    }
    return ApiResponse.success("success",job)
  }
}
