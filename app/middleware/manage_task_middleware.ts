import { manageTasks } from '#abilities/main'
import Project from '#models/project'
import ApiResponse from '#models/utils/ApiResponse'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { copyFileSync } from 'node:fs'

export default class ManageTaskMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const project=await Project.findBy('slug',ctx.params.projectId)

    console.log("on est bien ici")

    if(!project){
      return ctx.response.status(403).json(ApiResponse.forbidden('Level Permission required'))
    }

    console.log("demo en bas")


    project.related('members')

    console.log(project.id)

    if (project && await ctx.bouncer.allows(manageTasks, project)) {
      return await next()
    }

    console.log(" on est bien en bas")

    return ctx.response.status(403).json(ApiResponse.forbidden('Level Permission required'))

  }
}