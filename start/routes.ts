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
const ProductsController = () => import('#controllers/products_controller')
const SalesController = () => import('#controllers/sales_controller')

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

    router
      .group(() => {
        router.get('/', [ProductsController, 'index'])
        router.get('/:productId', [ProductsController, 'show'])
        router.post('/', [ProductsController, 'store'])
        router.put('/:productId', [ProductsController, 'update'])
        router.delete('/:productId', [ProductsController, 'delete'])
      })
      .prefix('products')
      .use(middleware.auth())

    router
      .group(() => {
        router.post('/', [SalesController, 'store'])
      })
      .prefix('sales')
      .use(middleware.auth())
  })
  .prefix('/api')
