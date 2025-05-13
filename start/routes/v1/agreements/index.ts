import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AgreementsController from '#controllers/agreements_controller'


router.group(()=>{
        router.post('/create',[AgreementsController,'store'])
        router.get('/:agreementId',[AgreementsController,'show'])
        .where('agreementId',router.matchers.number())

        router.delete('/:agreementId',[AgreementsController,'destroy'])
        .use(middleware.onlyAdmin())
        .where('agreementId',router.matchers.number())
}).prefix('/v1/api/agreements').use([middleware.auth()])







