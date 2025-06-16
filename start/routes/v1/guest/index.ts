import GuestsController from "#controllers/guests_controller";
import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";

router.group(()=>{

    router.post('/create-api',[GuestsController,'storeApi'])
    router.post('/create',[GuestsController,'store'])

    router.delete('/:guestId/destroy',[GuestsController,'destroy'])
    .where('guestId',router.matchers.number())

}).prefix('/v1/api/companies/:companyId/guests/')
.use([middleware.auth(),middleware.manageCompanies()])
.where('companyId',router.matchers.uuid())

router
.post(
    '/v1/api/companies/:companyId/guests/:guestId/accept',
    [GuestsController,'accept']
).where('guestId',router.matchers.number()).use(middleware.auth())


router
.get(
    '/v1/api/companies/:companyId/guests/',
    [GuestsController,'listGuest']
).where('guestId',router.matchers.number()).use(middleware.auth())