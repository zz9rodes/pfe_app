import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'


router.group(()=>{
    router.group(()=>{
        router.post('/create',[UsersController,'create'])
        router.post('/accounts/create',[UsersController,'createAccount'])

        router.post('/login',[UsersController,'login'])
        router.put('/:id',[UsersController,'edit']).where('id',router.matchers.number())
        .use([
            middleware.auth(),
            middleware.editUser()
        ])
        router.get('/',[UsersController,'show']).use([middleware.auth()])
        router.get('/all',[UsersController,'index']).use([middleware.auth(),middleware.onlyAdmin()])

        router.delete('/destroy',[UsersController,'destroy']).use(middleware.auth())
        router.delete('/logout',[UsersController,'logout']).use(middleware.auth())

    }).prefix('users')
}).prefix('/v1/api/auth')

