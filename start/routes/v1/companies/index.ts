// import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import AccountsController from '#controllers/accounts_controller'
import { middleware } from '#start/kernel'
import CompaniesController from '#controllers/companies_controller'
import CompaniesVersionController from '#controllers/companies_versions_controller'
import CompaniesRequestsController from '#controllers/companies_requests_controller'


router.group(()=>{

    router.post('/create',[CompaniesController,'store']).use(middleware.onlyAdmin())

    router.get('/:companyId',[CompaniesController,'show'])


    router.get('/',[CompaniesController,'show']).use(middleware.getCompaniesDetails())

    router.put('/:companyId/update',[CompaniesController,'edit']).where('companyId',router.matchers.uuid())
    .use([
        middleware.manageCompanies()
    ])
    router.delete('/:companyId/destroy',[CompaniesController,'destroy']).where('companyId',router.matchers.uuid())
    .use([
        middleware.manageCompanies()
    ])

    router.group(()=>{
            router.post('/create',[CompaniesVersionController,'store'])

            router.group(()=>{

                router.put('/update',[CompaniesVersionController,'edit'])

                router.delete('/destroy',[CompaniesVersionController,'destroy'])

            }).prefix('/:versionId').where('versionId',router.matchers.number())

    }).prefix('/:companyId/companies_versions').where('companyId',router.matchers.uuid()).use([
        middleware.manageCompanies()
    ])

}).prefix('/v1/api/companies').use(middleware.auth())

router.get('/v1/api/companies/all',[CompaniesController,'index'])

router.group(()=>{
    router.post('create',[CompaniesRequestsController,'store'])
    router.get('/',[CompaniesRequestsController,'getAccountRequest'])
    router.post('/:slug_request/desapproved',[CompaniesRequestsController,'desApprovedCompanyRequest'])
    router.get('/all',[CompaniesRequestsController,'getAllRequestAndCompanie']).use(middleware.onlyAdmin())
    router.get('/:slug_request/',[CompaniesRequestsController,'get']).where('slug_request',router.matchers.uuid())
    router.put('/:slug_request/update',[CompaniesRequestsController,'edit']).where('slug_request',router.matchers.uuid())
}).prefix('/v1/api/company_request').use(middleware.auth())