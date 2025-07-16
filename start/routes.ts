/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import  './routes/v1/auth/index.js'

import './routes/v1/accounts/index.js'

import './routes/v1/companies/index.js'

import './routes/v1/cv_profiles/index.js'

import './routes/v1/jobs/index.js'

import './routes/v1/jobs_step/index.js'

import './routes/v1/applies/index.js'

import './routes/v1/contracts/index.js'

import './routes/v1/companies/index.js'

import './routes/v1/agreements/index.js'

import './routes/v1/files/index.js'

import './routes/v1/posts/index.js'

import './routes/v1/guest/index.js'

import './routes/v1/projects/index.js'

import './routes/v1/project_members/index.js'

import './routes/v1/tasks/index.js'

import './routes/v1/chats/index.js'

import './routes/v1/subscriptions/index.js'
import StatsController from '#controllers/stats_controller'
import { middleware } from './kernel.js'


router.get('/', async () => {
  return {
    hello: 'world demo ici ! ',
  }
})

router.get('/v1/api/stats',[StatsController,'show']).use([middleware.auth(),middleware.onlyAdmin()])
router.get('/v1/api/specifics',[StatsController,'showStats']).use([middleware.auth(),middleware.onlyAdmin()])

