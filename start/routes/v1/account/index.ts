// import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import AccountsController from '#controllers/accounts_controller'
import { middleware } from '#start/kernel'


router.group(()=>{
    router.post('/create/',[AccountsController,'store'])
    router.put('/:slug/update',[AccountsController,'edit']).where('slug',router.matchers.uuid()).use([
        middleware.auth(),
        middleware.manageAccount()
    ])

    router.delete('/:id/destroy',[AccountsController,'destroy']).where('id',router.matchers.number())
    .use([
        middleware.auth(),
        middleware.onlyAdmin()
    ])

    router.get('/',[AccountsController,'show']).use([
        middleware.auth()
    ])

    router.get('/all',[AccountsController,'index']).use([
        middleware.auth(),
        middleware.onlyAdmin()
    ])

    router.get('/find',[AccountsController,'findByname']).use([
        middleware.auth(),
        middleware.onlyAdmin()
    ])

}).prefix('/v1/api/accounts')