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
import User from '#models/user'

const UsersController = () => import('#controllers/users_controller')

// router.get('/', [UsersController, 'index']).prefix('/api')
// router.get('/:id', [UsersController, 'show']).prefix('/api')
// router.post('/', [UsersController, 'create']).prefix('/api')

router
  .post('login', async ({ request, auth }) => {
    const { email, password } = request.all()
    const user = await User.verifyCredentials(email, password)
    const x = await auth.use('jwt').generate(user)
    return { x, auth }
  })
  .use(middleware.auth())
  .prefix('/api')

router
  .get('/', async ({ auth }) => {
    return auth
  })
  .prefix('/api')
