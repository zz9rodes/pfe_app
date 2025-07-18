import Account from '#models/account'
import Company from '#models/company'
import CompanyVersion from '#models/company_version'
import Guest from '#models/guest'
import SubscriptionPlan from '#models/subscription_plan'
import ApiResponse from '#models/utils/ApiResponse'
import { CompanyScope, CompanyStatus, SubscriptionStatus } from '#models/utils/index'
import { Exception } from '@adonisjs/core/exceptions'
import { DateTime } from 'luxon'


export class CompanyService {
  async getAllCompanies(page:number=1) {
    const companies = await Company.query().select('*').where('is_verify',true).paginate(page,20)

    await Promise.all(companies.map(async(company) => {
      await company.load('jobs',(guestQuery) => {
        guestQuery.select(['id'])
      })

      await company.load('guests', (guestQuery) => {
        guestQuery.select(['id']).where('accept', true)
      })
    }))


    return ApiResponse.success('success', companies)
  }

  async createCompany(accountId: number, payload: any,isVerify =false) {
    try {
      const existingCompany = await Company.findBy('account_id', accountId)
      if (existingCompany || payload.status==CompanyStatus.APPROVED) {
        return ApiResponse.error('An account can only have one company')
      }

      const admin = await Account.find(accountId)
      if (!admin) {
        return ApiResponse.error('Account not found')
      }

      const company = new Company()
      company.fill({
        slug: crypto.randomUUID(),
        isVerify: isVerify,
        accountId: admin.id,
      })

      await company.save()
      
      let scopes = []
      for (const value of Object.values(CompanyScope)) {
        scopes.push(value)
      }

      await Guest.create({
        role: 'ADMIN',
        scopes: scopes,
        accountId: company.accountId,
        companyId: company.id,
        accept: true,
      })

      const now = DateTime.now()

      const plan= await SubscriptionPlan.query().select('*').whereNot('price',0).first()

      const end = now.plus({ days: plan?.duration || 50 })


      admin.related('subscriptions').create({
              accountId: admin.id,
              subscriptionPlanId: plan?.id || 1,
              status: SubscriptionStatus.ACTIVE,
              startDate: now,
              endDate: end,
              paymentReference: `SEED-${admin.id}-${plan?.id || end}`,
              isVerified: true,
            })

      await company.related('admin').associate(admin)

      const { isActive, status,...versionData } = payload
      await company.related('details').create({ isActive: true, status:CompanyStatus.APPROVED,...versionData })

      await company.load('activeDetails')
      return ApiResponse.success('Companies Approved Successfully 🤑', company)
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return ApiResponse.error('An account can only have one company')
      }

      return ApiResponse.error('Internal error')
    }
  }

  async updateCompany(companyId: string | null, data: any) {
    const { adminId, detailId, isVerify } = data

    const company = await Company.findBy('slug', companyId)
    if (!company) {
      return ApiResponse.error('Invalid Company Info')
    }

    if (adminId) {
      const admin = await Account.findBy('slug', adminId)
      if (admin) {
        await company.related('admin').associate(admin)
      }
    }

    if (detailId) {
      const version = await CompanyVersion.find(detailId)

      if (version && version.company_id == company.id) {
        await CompanyVersion.query()
          .where('company_id', company.id)
          .where('is_active', true)
          .update({ is_active: false })

        version.isActive = true
        await version!.save()
      }
    }

    if (typeof isVerify === 'boolean') {
      company.isVerify = isVerify
    }

    await company.load('activeDetails')
    await company.save()

    return ApiResponse.success('success', company)
  }

  async destroyCompany(companyId: string) {
    const company = await Company.findBy('slug', companyId)

    if (company) {
      await company.delete()
    }
    return ApiResponse.success('success')
  }

  async getCompanyDetails(accountId: number | undefined) {
    try {
      if (!accountId) {
        return ApiResponse.error('Account not found')
      }

      const company = await Company.query()
        .where('account_id', accountId)
        .preload('activeDetails')
        .first()

      if (!company) {
        return ApiResponse.error('No company found for this account')
      }

    
      await company.load('jobs', async(job)=>{
        await job.preload('applies',query=>{
          query.select(['id','account_id'])
        })
      })
      await company.load('posts')
      await company.load('guests',async (guestQuery) => {
        await guestQuery
          .where('accept', true)
          .preload('account', (accountQuery) => {
            accountQuery.select(['first_name', 'last_name','avatarUrl','first_langage'])
          })
      })



      return ApiResponse.success('Success', company)
    } catch (error) {
      console.log("erreur ici")
      console.log(error)
      throw new Exception(`Failed to retrieve company details: ${error.message}`, {
        status: 500,
        code: 'E_COMPANY_RETRIEVAL_FAILED',
      })
    }
  }

    async getCompanyDetailsById(companyId: string | undefined) {
    try {
      if (!companyId) {
        return ApiResponse.notFound('Companie Not Found')
      }



      const company = await Company.query()
        .where('slug', companyId)
        .preload('activeDetails')
        .first()

      if (!company) {
        return ApiResponse.error('No company found for this account')
      }

    
      await company.load('jobs')
      await company.load('posts')
      await company.load('guests', (guestQuery) => {
        guestQuery
          .where('accept', true)
          .preload('account', (accountQuery) => {
            accountQuery.select(['first_name', 'last_name','avatarUrl','first_langage'])
          })
      })



      return ApiResponse.success('Success', company)
    } catch (error) {
      console.log("erreur ici")
      console.log(error)
      throw new Exception(`Failed to retrieve company details: ${error.message}`, {
        status: 500,
        code: 'E_COMPANY_RETRIEVAL_FAILED',
      })
    }
  }
}
