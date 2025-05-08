import router from "@adonisjs/core/services/router"
import JobStepsValidationController from '#controllers/job_steps_validations_controller'
import { middleware } from "#start/kernel"


router.group(()=>{

    router.post('/create',[JobStepsValidationController,'store'])

    router.put("/:stepId/update",[JobStepsValidationController,'update'])
    .where('stepId', router.matchers.number());


    router.delete("/:stepId/destroy",[JobStepsValidationController,'destroy'])
    .where('stepId', router.matchers.number());


    router.get("/:stepId/",[JobStepsValidationController,'show'])
    .where('stepId', router.matchers.number());

    router.get("",[JobStepsValidationController,'index'])

}).prefix('v1/api/jobs/:jobId/steps')
.use([middleware.auth(),middleware.manageJobs()])
.where('jobId', router.matchers.uuid());