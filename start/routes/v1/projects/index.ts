import router from "@adonisjs/core/services/router"
import { middleware } from "#start/kernel"
import ProjectsController from "#controllers/projects_controller"


router.group(() => {
    router.get('/all', [ProjectsController, 'lisCompanieProjetcts'])

    router.post('/create', [ProjectsController, 'store'])

    router.put("/:projectId/update", [ProjectsController,'update'])
        .where(':projectId', router.matchers.uuid());

    router.delete("/:projectId/destroy", [ProjectsController, 'destroy'])
        .where(':projectId', router.matchers.uuid());

    router.get("/:projectId/", [ProjectsController, 'show'])
        .where(':projectId', router.matchers.uuid());

    router.get("/:projectId/members", [ProjectsController, 'getProjectMembers'])
        .where(':projectId', router.matchers.uuid());

}).prefix('v1/api/companies/:companyId/projects/')
.use([middleware.auth(),middleware.manageCompanies()]).where('companyId',router.matchers.uuid())
