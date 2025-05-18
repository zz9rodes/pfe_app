/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

/**
 * The error handler is used to convert an exception
 * to a HTTP return response.
 */
server.errorHandler(() => import('#exceptions/handler'))

/**
 * The server middleware stack runs middleware on all the HTTP
 * requests, even if there is no route registered for
 * the request URL.
 */
server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

/**
 * The router middleware stack runs middleware on all the HTTP
 * requests with a registered route.
 */
router.use([() => import('@adonisjs/core/bodyparser_middleware'), () => import('@adonisjs/auth/initialize_auth_middleware'), () => import('#middleware/initialize_bouncer_middleware')])

/**
 * Named middleware collection must be explicitly assigned to
 * the routes or the routes group.
 */
export const middleware = router.named({
  manageTask: () => import('#middleware/manage_task_middleware'),
  manageContract: () => import('#middleware/manage_contract_middleware'),
  manageJobs: () => import('#middleware/manage_jobs_middleware'),
  manageCvProfile: () => import('#middleware/manage_cv_profile_middleware'),
  manageCompanies: () => import('#middleware/manage_companies_middleware'),
  getCompaniesDetails: () => import('#middleware/get_companies_details_middleware'),
  onlyAdmin: () => import('#middleware/only_admin_middleware'),
  manageAccount: () => import('#middleware/manage_account_middleware'),
  auth: () => import('#middleware/auth_middleware'),
  editUser: () => import('#middleware/edit_user_middleware')
})
