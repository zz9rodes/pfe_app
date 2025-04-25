// import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import AccountsController from '#controllers/accounts_controller'
import { middleware } from '#start/kernel'


router.group(()=>{

    router.post('/create',[AccountsController,'store'])
    router.put('/upddate/:id',[AccountsController,'edit']).where('id',router.matchers.uuid())
    .use([
        middleware.auth(),
        middleware.manageAccount()
    ])
    router.delete('/destroy/:id',[AccountsController,'destroy']).where('id',router.matchers.uuid())
    .use([
        middleware.auth(),
        middleware.manageAccount()
    ])

}).prefix('/accounts')