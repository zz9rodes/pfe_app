import CvProfilesController from '#controllers/cv_profiles_controller';
import { middleware } from '#start/kernel';
import router from '@adonisjs/core/services/router';

router.group(() => {
  router.post('/create', [CvProfilesController, 'store']);

  router.group(() => {
    router.put('/update', [CvProfilesController, 'edit']);
    router.get('/',[CvProfilesController,'show'])
    router.delete('/destroy',[CvProfilesController,'destroy'])
  })
  .prefix('/:cvProfileId')
  .use(middleware.manageCvProfile())
  .where('cvProfileId', router.matchers.uuid());

})
.prefix('/v1/api/cv_profile')
.use([middleware.auth()]);