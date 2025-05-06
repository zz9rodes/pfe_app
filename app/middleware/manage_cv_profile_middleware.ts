import { editCvprofile } from '#abilities/main'
import ApiResponse from '#models/utils/ApiResponse'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ManageCvProfileMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    
     if (await ctx.bouncer.allows(editCvprofile, ctx.params.cvProfileId)) {    
          
        return await next()
     }

      return ctx.response
               .status(403)
               .json(
                 ApiResponse.forbidden("Level Permission required")
               )
        
  }
}