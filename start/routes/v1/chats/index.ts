import ChatsController from '#controllers/chats_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'


router.group(() => {
    router.post('groups/create', [ChatsController, 'store'])
    router.delete('/groups/:chatId/destroy',[ChatsController,'destroy']).where('chatId',router.matchers.number())

    router.post('/groups/add_members',[ChatsController,'AddMembers'])

    router.delete('/groups/add_members/memberId/destroy',[ChatsController,'destroyMembers'])
    router.get('/',[ChatsController,'getChatAccount'])
}).prefix('/v1/api/chats/').use([middleware.auth()])



