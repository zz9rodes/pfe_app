import Job from '#models/job';
import JobStepsValidation from '#models/job_steps_validation'
import ApiResponse from '#models/utils/ApiResponse'

export class JobStepsValidationService {
  async create(jobId: string, data: any) {

    const job = await Job.findBy('slug', jobId)

    try {
      job?.related('stepsValidation').create(data)

      return ApiResponse.success("sucess", job)
    } catch (error) {
      console.error('Error creating step:', error)
      return ApiResponse.error(error)
    }
  }

  async update(id: number, data: any) {
    
    const step = await JobStepsValidation.find(id)
    if (!step) {
      return ApiResponse.notFound("Ressource Not Found")
    }

    await step.merge(data).save()
    
    return ApiResponse.success("success", step)
  }

  async delete(id: number) {
    const step = await JobStepsValidation.find(id)
    if (!step) {
      return ApiResponse.notFound("message: 'Step not found'")
    }

    await step.delete()
    return ApiResponse.success("success", { message: 'Step deleted successfully' })
  }

  async getAllJobStepsValidation(jobId: string) {

    const job = await Job.findBy('slug', jobId)

    if (!job) {
      return ApiResponse.error("Ressource Not Found")
    }

    const steps = await JobStepsValidation.findManyBy('job_id', job?.id)

    return ApiResponse.success('success', steps)
  }

  async getById(id: number) {
    const step = await JobStepsValidation.find(id)
    return ApiResponse.success("success", step ?? { message: 'Step not found' })
  }
}
