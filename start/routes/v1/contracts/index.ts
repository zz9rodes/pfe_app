import ContractsController from '#controllers/contracts_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'


router.group(() => {
    router.get('/', [ContractsController, 'index'])
    router.post('/create', [ContractsController, 'store']).use(middleware.manageCompanies())

    router.get('/:contractId', [ContractsController, 'show']).where('contractId',router.matchers.uuid())
    router.put('/:contractId/update', [ContractsController, 'update']).middleware([middleware.manageCompanies(), middleware.manageContract()]).where('contractId',router.matchers.uuid())
    router.delete('/:contractId', [ContractsController, 'destroy']).middleware([middleware.manageCompanies(), middleware.manageContract()]).where('contractId',router.matchers.uuid())
}).prefix('/v1/api/companies/:companyId/contracts').use([middleware.auth()])
.where('companyId',router.matchers.uuid())



