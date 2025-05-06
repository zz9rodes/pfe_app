import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { AccountType } from '#models/utils/index'
import ApiResponse from '#models/utils/ApiResponse'

export default class GetCompaniesDetailsMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {

    const account=ctx.auth.user?.account


    if(account?.accountType==AccountType.COMPANIES){
     return  next()
    }


    if(ctx.auth.user?.isAdmin){
      return next()
    }

    
  return ctx.response
               .status(403)
               .json(
                 ApiResponse.forbidden("Level Permission required")
               )
  }
}