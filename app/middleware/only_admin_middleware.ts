import ApiResponse from '#models/utils/ApiResponse'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
ApiResponse

export default class OnlyAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
   if(ctx.auth.user?.isAdmin){
    return await next()
   }
    

     return ctx.response
              .status(403)
              .json(
                ApiResponse.forbidden("Admin Level Permission required")
              )
  }
}