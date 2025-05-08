import { manageCompany } from '#abilities/main'
import Job from '#models/job'
import ApiResponse from '#models/utils/ApiResponse'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ManageJobsMiddleware {
   async handle(ctx: HttpContext, next: NextFn) {
 
    const jobId=ctx.params.jobId
    const job=await Job.findBy('slug',jobId)

    await job?.load('company')

    const company=job?.company

 
     if (company && (await ctx.bouncer.allows(manageCompany,company ))) {
       return await next()
     }
 
     return ctx.response
       .status(403)
       .json(
         ApiResponse.forbidden("Level Permission required")
       )
   }
}