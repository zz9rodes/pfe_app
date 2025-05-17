import ProjectTeamsController from "#controllers/project_teams_controller";
import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";


router.group(()=>{

    router.post('/create',[ProjectTeamsController,'store'])
    router.post('/create_many',[ProjectTeamsController,'storeMany'])

    router.delete('/:memberId/destroy',[ProjectTeamsController,'destroy']).where('memberId',router.matchers.number())
    router.delete('/destroy_many',[ProjectTeamsController,'destroyMany'])

}).prefix('/v1/api/companies/:companyId/project_members').use([middleware.auth(),middleware.manageCompanies()])