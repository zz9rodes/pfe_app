import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { editAccount } from '#abilities/main'

export default class ManageAccountMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    console.log(ctx)

    /**
     * Call next method in the pipeline and return its output
     */

     if (await ctx.bouncer.allows(editAccount, ctx.params.id)) {
          await next()
        }
        return  ctx.response.forbidden("you don't have permission")
    }
}