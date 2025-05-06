import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { editUser } from '#abilities/main'
import ApiResponse from '#models/utils/ApiResponse'


export default class EditUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {


    if (await ctx.bouncer.allows(editUser, ctx.params.id)) {
     return  await next()
    }

    return ctx.response
          .status(403)
          .json(
            ApiResponse.forbidden("Level Permission required")
          )

  }
}