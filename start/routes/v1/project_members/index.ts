import TeamMembersController from "#controllers/team_member_controller";
import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";


router.group(()=>{

    router.post('/create',[TeamMembersController,'store'])
    router.post('/create_many',[TeamMembersController,'storeMany'])

    router.delete('/:memberId/destroy',[TeamMembersController,'destroy']).where('memberId',router.matchers.number())
    router.delete('/destroy_many',[TeamMembersController,'destroyMany'])

}).prefix('/v1/api/companies/:companyId/project_members').use([middleware.auth(),middleware.manageCompanies()])