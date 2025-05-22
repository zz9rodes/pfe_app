import router from "@adonisjs/core/services/router"
import { middleware } from "#start/kernel"
import SubscriptionsController from "#controllers/subscriptions_controller"
import LygosController from "#controllers/lygos_controller"


router.group(() => {
   router.post('/subscribe',[SubscriptionsController,'activate'])

   router.post('/gateway', [LygosController,'createGateway'])

   router.get('/gateway/:gatewayId', [LygosController,'getGateway'])
}).prefix('v1/api/subscriptions/')
.use([middleware.auth()])
