import router from "@adonisjs/core/services/router"
import { middleware } from "#start/kernel"
import PostsController from "#controllers/posts_controller"


router.group(() => {
    router.get('/all', [PostsController, 'showCompanypost'])

    router.post('/create', [PostsController, 'store'])

    router.put("/:postId/update", [PostsController, 'edit'])
        .where(':postId', router.matchers.uuid());

    router.put("/:postId/desactive", [PostsController, 'unPublishPost'])
        .where(':postId', router.matchers.number());


    router.delete("/:postId/destroy", [PostsController, 'destroy'])
        .where(':postId', router.matchers.uuid());


    router.get("/:postId/", [PostsController, 'showPost'])
        .where(':postId', router.matchers.uuid());

}).prefix('v1/api/companies/:companyId/posts/')
.use([middleware.auth(),middleware.manageCompanies()]).where('companyId',router.matchers.uuid())


router.post('v1/api/posts/comment',[PostsController,'CommentPost']).use(middleware.auth())
router.post('v1/api/posts/like',[PostsController,'LikePost']).use(middleware.auth())
router.post('v1/api/posts/un_like',[PostsController,'unLikePost']).use(middleware.auth())