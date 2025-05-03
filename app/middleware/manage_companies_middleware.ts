import { manageCompaniesVersion } from '#abilities/main'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ManageCompaniesMiddleware {
   async handle(ctx: HttpContext, next: NextFn) {
  
    
       if (await ctx.bouncer.allows(manageCompaniesVersion, ctx.params?.company_slug)) {        
          return await next()
        }
          return  ctx.response.forbidden("you don't have permission")
    }
}