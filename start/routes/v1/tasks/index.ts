import router from "@adonisjs/core/services/router"
import { middleware } from "#start/kernel"
import TasksController from "#controllers/tasks_controller"


router.group(() => {
    router.post('create',[TasksController,'store'])
    router.put('/:taskId/update',[TasksController,'update'])
    router.delete('/:taskId/destroy',[TasksController,'destroy'])
    router.get('/:taskId',[TasksController,'show'])
    router.get('/',[TasksController,'indexProjectTask'])
}).prefix('v1/api/companies/:companyId/projects/:projectId/tasks')
.use([middleware.auth(),middleware.manageTask()])
.where('companyId',router.matchers.uuid())
.where('projectId',router.matchers.uuid())
.where('taskId',router.matchers.uuid())

