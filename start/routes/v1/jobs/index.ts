// import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import JobsController from '#controllers/jobs_controller'


router.group(()=>{
    router.group(()=>{

        router.post('/create',[JobsController,'store'])
        router.post('/create_many',[JobsController,'storeMany'])
        router.put('/:jobId/update',[JobsController,'edit'])
        router.delete('/:jobId/destroy',[JobsController,'destroy'])
        router.get('/all',[JobsController,'index'])
    }).prefix('/jobs')

}).prefix('/v1/api/companies/:companyId').use([middleware.auth(),middleware.manageCompanies()])

router.get('/v1/api/extern/companies/jobs/all',[JobsController,'all'])

router.get('/v1/api/extern/companies/jobs/:jobId',[JobsController,'show'])





