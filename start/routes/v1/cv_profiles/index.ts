import CvProfilesController from '#controllers/cv_profiles_controller'
import EducationsController from '#controllers/educations_controller'
import LinksController from '#controllers/links_controller'
import PdfGeneratorController from '#controllers/pdf_generators_controller'
import PersonalProjectsController from '#controllers/personnal_projects_controller'
import WorkExperiencesController from '#controllers/work_experiences_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.post('/create', [CvProfilesController, 'store'])
    router.get('/:cvProfileId/', [CvProfilesController, 'show'])
    .where('cvProfileId', router.matchers.uuid())

    router.get('/', [CvProfilesController, 'getDetails'])

    router
      .group(() => {
        router.put('/update', [CvProfilesController, 'edit'])
        router.delete('/destroy', [CvProfilesController, 'destroy'])

        router
          .group(() => {
            router.get('/', [LinksController, 'index'])
            router.post('/create', [LinksController, 'store'])

            router
              .put('/:linkId/update', [LinksController, 'edit'])
              .where('linkId', router.matchers.number())

            router
              .delete('/:linkId/destroy', [LinksController, 'destroy'])
              .where('linkId', router.matchers.number())
          })
          .prefix('/links')

        router
          .group(() => {
            router.get('/', [EducationsController, 'index'])
            router.post('/create', [EducationsController, 'store'])

            router
              .put('/:educationId/update', [EducationsController, 'edit'])
              .where('educationId', router.matchers.number())

            router
              .delete('/:educationId/destroy', [EducationsController, 'destroy'])
              .where('educationId', router.matchers.number())
          })
          .prefix('/educations')

        router
          .group(() => {
            router.get('/', [PersonalProjectsController, 'index'])
            router.post('/create', [PersonalProjectsController, 'store'])

            router.put('/:projectId/update', [PersonalProjectsController, 'edit'])
            router.delete('/:projectId/destroy', [PersonalProjectsController, 'destroy'])
          })
          .prefix('/personal_projects')

        router
          .group(() => {
            router.get('/', [WorkExperiencesController, 'index'])
            router.post('/create', [WorkExperiencesController, 'store'])

            router.put('/:experienceId/update', [WorkExperiencesController, 'edit'])
            router.delete('/:experienceId/destroy', [WorkExperiencesController, 'destroy'])
          })
          .prefix('/work_experiences')
      })
      .prefix('/:cvProfileId')
      .use(middleware.manageCvProfile())
      .where('cvProfileId', router.matchers.uuid())
  })
  .prefix('/v1/api/cv_profiles')
  .use([middleware.auth()])


  router.get('/v1/api/extern/cv_profiles/:cvProfileId/', [CvProfilesController, 'show'])


  router.post('v1/api/cv_profiles/generate-pdf', [PdfGeneratorController,'generatePdf'])

