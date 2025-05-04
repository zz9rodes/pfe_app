import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { editUser } from '#abilities/main'


export default class EditUserMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {


    if (await ctx.bouncer.allows(editUser, ctx.params.id)) {
     return  await next()
    }
    return  ctx.response.forbidden("you don't have permission")

  }
}