import { manageCompany } from '#abilities/main'
import Contract from '#models/contract'
import ApiResponse from '#models/utils/ApiResponse'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ManageContractMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
console.log("au debut du midleware");

    const contractId = ctx.params.contractId
    const contract = await Contract.findBy('slug', contractId)

    await contract?.load('company')

    console.log(contract)
    const company = contract?.company


    if (company && (await ctx.bouncer.allows(manageCompany, company))) {
      return await next()
    }

    return ctx.response
      .status(403)
      .json(
        ApiResponse.forbidden("Level Permission required")
      )
  }
}