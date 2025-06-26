import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import AppliesController from '#controllers/applies_controller'


router.group(()=>{

        router.post('/create',[AppliesController,'store'])

        router.delete('/:applyId/destroy',[AppliesController,'destroy'])

        router.get('/:applyId',[AppliesController,'show']).where('applyId',router.matchers.uuid())

        router.get('/',[AppliesController,'showUserApply'])

        router.get('/all',[AppliesController,'index']).use(middleware.onlyAdmin())

        router.get('/jobs/:jobId',[AppliesController,'jobApplications']).where('jobId',router.matchers.uuid())

}).prefix('/v1/api/applies').use([middleware.auth()])







