import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class OnlyAdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
   if(ctx.auth.user?.isAdmin){
    return await next()
   }
    
    return ctx.response.forbidden({error:"You can't access to this ressources"})
  }
}