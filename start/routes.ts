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
import './routes/v1/account/index.js'
import './routes/v1/company/index.js'

router.get('/', async () => {
  return {
    hello: 'world demo ici ! ',
  }
})
