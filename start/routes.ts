/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const UsersController = () => import('#controllers/users_controller')
const CustomersController = () => import('#controllers/customers_controller')

router
  .group(() => {
    router.group(() => {
      router.post('/signup', [UsersController, 'signUp'])
      router.post('/login', [UsersController, 'login'])
    })
    router
      .group(() => {
        router.get('/', [CustomersController, 'index'])
        router.get('/:customerId', [CustomersController, 'show'])
        router.post('/', [CustomersController, 'store'])
        router.put('/:customerId', [CustomersController, 'update'])
        router.delete('/:customerId', [CustomersController, 'delete'])
      })
      .prefix('customers')
      .use(middleware.auth())
  })
  .prefix('/api')
