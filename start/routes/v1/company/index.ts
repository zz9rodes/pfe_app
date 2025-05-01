// import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import AccountsController from '#controllers/accounts_controller'
import { middleware } from '#start/kernel'
import CompaniesController from '#controllers/companies_controller'
import CompaniesVersionController from '#controllers/companies_versions_controller'
import CompaniesRequestsController from '#controllers/companies_requests_controller'


router.group(()=>{

    router.post('/create',[CompaniesController,'store'])

    router.put('/upddate/:id',[AccountsController,'edit']).where('id',router.matchers.uuid())
    .use([
        middleware.manageAccount()
    ])
    router.delete('/destroy/:id',[AccountsController,'destroy']).where('id',router.matchers.uuid())
    .use([
        middleware.manageAccount()
    ])

    router.group(()=>{
        router.post('create',[CompaniesRequestsController,'store'])
        router.put('/:slug_request/update',[CompaniesRequestsController,'edit']).where('slug_request',router.matchers.uuid())
    }).prefix('/:slug/company_request').where('slug',router.matchers.uuid())

}).prefix('/v1/api/companies').use(middleware.auth())