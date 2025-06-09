import type { HttpContext } from '@adonisjs/core/http'
import Account from '#models/account'
import CompanyVersionPolicy from '#policies/company_version_policy'
import {
  createCompanyVersionsValidator,
  editCompanyVerionsValidator,
} from '#validators/company_version'
import { inject } from '@adonisjs/core'
import { CompaniesRequestService } from '#services/companies_request_service'
import { errors } from '@vinejs/vine'
import ApiResponse from '#models/utils/ApiResponse'
import EmailEmiterService from '#services/email_emiter_service'
import { EmailData } from '#models/utils/index'
import CompanyRequest from '#models/company_request'
import { renderDesapprovedCompanie } from '../../html/jsTemplate/desapproved.js'
import env from '#start/env'

@inject()
export default class CompaniesRequestsController {
  constructor(
    private CompaniesRequestService: CompaniesRequestService,
    private EmailEmiterService: EmailEmiterService
  ) {}
  async store({ request, response, bouncer, auth }: HttpContext) {
    console.log(request.all())
    try {
      const account: Account | null | undefined = request.input('slug')
        ? await Account.findBy('slug', request.input('slug'))
        : null
      if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {
        return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }

      const data = await createCompanyVersionsValidator.validate(request.all())

      const result = await this.CompaniesRequestService.RequestCompany(auth!.user!, data)
      return response.status(result.statusCode).json(result)
    } catch (error) {
      console.log(error)

      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
      }

      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async edit({ response, request, params, bouncer }: HttpContext) {
    try {
      const account: Account | null = params.slug ? await Account.findBy('slug', params.slug) : null
      if (await bouncer.with(CompanyVersionPolicy).denies('create', account)) {
        return response.forbidden(ApiResponse.forbidden("You don't have access to this Ressources"))
      }
      const data = await editCompanyVerionsValidator.validate(request.all())
      const slug = params.slug_request
      const result = await this.CompaniesRequestService.EditRequestCompany(slug, data)
      return response.status(result.statusCode).json(result)
    } catch (error) {
      console.log(error)
      if (error instanceof errors.E_VALIDATION_ERROR) {
        return response.status(422).json(ApiResponse.validation('Invalid input', error.messages))
      }

      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async getAccountRequest({ response, auth }: HttpContext) {
    try {
      const accountId = auth?.user?.account.id

      const result = await this.CompaniesRequestService.getRequestDetails(accountId)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async getAllRequestAndCompanie({ response }: HttpContext) {
    try {
      const result = await this.CompaniesRequestService.getAllRequestAndCompanie()

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  async get({ response, params }: HttpContext) {
    try {
      console.log(params)
      const result = await this.CompaniesRequestService.getRequest(params?.slug_request)

      return response.status(result.statusCode).json(result)
    } catch (error) {
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }

  static renderDesapprovedMessage = (reason: string) => {
    return `Hello,Unfortunately, your creation request has been disapproved after review. \nThis may be due to missing information, invalid content, or policy violations.\n Please revise your request and resubmit if necessary. If you believe this is a mistake, feel free to contact support. \n${reason}`
  }

  async desApprovedCompanyRequest({ request, response, params, auth }: HttpContext) {
    console.log("desApprovedCompanyRequest")
    try {
      const request_c = await CompanyRequest.findBy('slug', params?.slug_request)
      const reason = request.input('reason')
      const adminAccount = await Account.find(request_c?.adminId)
      const clientDomain=env.get('APP_CLIENT_DOMAIN')

      const emailData: EmailData = {
        from: auth?.user!.id,
        to: adminAccount!.userId,
        cc: 'Companie DesApproved',
        bcc: 'Companie DesApproved',
        subject: 'Companie DesApproved',
        html: renderDesapprovedCompanie(request_c!.name,`${clientDomain}/account/profile/companies/version/`,reason),
        text: CompaniesRequestsController.renderDesapprovedMessage(reason),
      }

      const emailSend = await this.EmailEmiterService.sendEmail(emailData)
      return response.json(emailSend)
    } catch (error) {
      console.log(error)
      return response
        .status(500)
        .json(ApiResponse.error('Internal server error', 'E_INTERNAL_ERROR', error))
    }
  }
}
