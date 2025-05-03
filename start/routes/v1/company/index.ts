// import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import AccountsController from '#controllers/accounts_controller'
import { middleware } from '#start/kernel'
import CompaniesController from '#controllers/companies_controller'
import CompaniesVersionController from '#controllers/companies_versions_controller'
import CompaniesRequestsController from '#controllers/companies_requests_controller'


router.group(()=>{

    router.post('/create',[CompaniesController,'store'])

    router.get('/',[CompaniesController,'show']).use(middleware.getCompaniesDetails())


    router.put('/:company_slug/update',[CompaniesController,'edit']).where('company_slug',router.matchers.uuid())
    .use([
        middleware.manageCompanies()
    ])

    router.delete('/destroy/:id',[CompaniesController,'destroy']).where('id',router.matchers.uuid())
    .use([
        middleware.manageAccount()
    ])

    router.group(()=>{
            router.post('/create',[CompaniesVersionController,'store'])
    }).prefix('/:company_slug/companies_versions').where('company_slug',router.matchers.uuid()).use([
        middleware.manageCompanies()
    ])

}).prefix('/v1/api/companies').use(middleware.auth())

router.get('/v1/api/companies/all',[CompaniesController,'index'])

router.group(()=>{
    router.post('create',[CompaniesRequestsController,'store'])
    router.put('/:slug_request/update',[CompaniesRequestsController,'edit']).where('slug_request',router.matchers.uuid())
}).prefix('/v1/api/company_request').use(middleware.auth())