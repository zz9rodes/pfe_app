import { manageTasks } from '#abilities/main'
import Project from '#models/project'
import ApiResponse from '#models/utils/ApiResponse'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ManageTaskMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const project=await Project.findBy('slug',ctx.params.projectId)

    if(!project){
      return ctx.response.status(403).json(ApiResponse.forbidden('Level Permission required'))
    }


    project.related('members')

    if (project && (await ctx.bouncer.allows(manageTasks, project))) {
      return await next()
    }

    return ctx.response.status(403).json(ApiResponse.forbidden('Level Permission required'))

  }
}