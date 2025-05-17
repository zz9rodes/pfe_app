import router from "@adonisjs/core/services/router"
import JobStepsController from '#controllers/job_steps_controller'
import { middleware } from "#start/kernel"


router.group(()=>{

    router.post('/create',[JobStepsController,'store'])

    router.put("/:stepId/update",[JobStepsController,'update'])
    .where('stepId', router.matchers.number());


    router.delete("/:stepId/destroy",[JobStepsController,'destroy'])
    .where('stepId', router.matchers.number());


    router.get("/:stepId/",[JobStepsController,'show'])
    .where('stepId', router.matchers.number());

    router.get("",[JobStepsController,'index'])

}).prefix('v1/api/jobs/:jobId/steps')
.use([middleware.auth(),middleware.manageJobs()])
.where('jobId', router.matchers.uuid());