import UsersController from '#controllers/users_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'


router.group(()=>{
    router.group(()=>{
        router.post('/create',[UsersController,'create'])
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

// router.get('/me', async () => {
//   return [
//     {
//         id: 1,
//         name: "Alice Dupont",
//         email: "alice.dupont@example.com",
//         age: 28
//     },
//     {
//         id: 2,
//         name: "Bob Martin",
//         email: "bob.martin@example.com",
//         age: 34
//     },
//     {
//         id: 3,
//         name: "Clara Bernard",
//         email: "clara.bernard@example.com",
//         age: 22
//     },
//     {
//         id: 4,
//         name: "David Lefèvre",
//         email: "david.lefevre@example.com",
//         age: 45
//     },
//     {
//         id: 5,
//         name: "Eve Moreau",
//         email: "eve.moreau@example.com",
//         age: 30
//     },
//     {
//         id: 6,
//         name: "François Petit",
//         email: "francois.petit@example.com",
//         age: 39
//     }
// ]
// })