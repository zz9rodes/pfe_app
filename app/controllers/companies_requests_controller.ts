import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'
import CompanyVersionPolicy from '#policies/company_version_policy'
import { createCompanyVersionsValidator, editCompanyVerionsValidator } from '#validators/company_version'
import { inject } from '@adonisjs/core'
import { CompaniesRequestService } from '#services/companies_request_service'
import { errors } from '@vinejs/vine'


@inject()
export default class CompaniesRequestsController {

    constructor(private CompaniesRequestService: CompaniesRequestService) { }
    async store({ request, response, bouncer, params,auth }: HttpContext) {

        try {
            const account: Account | null = params.slug ? await Account.findBy('slug', params.slug) : null
            if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {

                return response.forbidden("You don't have access to this Ressources")
            }
            const data = await createCompanyVersionsValidator.validate(request.all())
            return response.json(await this.CompaniesRequestService.RequestCompany(auth!.user!,data))
        } catch (error) {
            console.log(error);
            
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(error)
            } else {
                return response.internalServerError({ message: 'Internal Server Error.', error })
            }
        }
    }

    async edit({response,request,params,bouncer}:HttpContext){
        try {
            const account: Account | null = params.slug ? await Account.findBy('slug', params.slug) : null
            if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {

                return response.forbidden("You don't have access to this Ressources")
            }
            const data = await editCompanyVerionsValidator.validate(request.all())
            const slug=params.slug_request
            return response.json(await this.CompaniesRequestService.EditRequestCompany(slug,data))
        } catch (error) {
            if (error instanceof errors.E_VALIDATION_ERROR) {
                return response.status(422).json(error)
            } else {
                return response.internalServerError({ message: 'Internal Server Error.', error })
            }
        }
    }
}