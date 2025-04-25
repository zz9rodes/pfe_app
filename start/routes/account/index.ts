// import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import AccountsController from '#controllers/accounts_controller'


router.group(()=>{

    router.post('/create',[AccountsController,'store'])

}).prefix('/accounts')