import User from '#models/user'
import { signUpValidator, loginValidator } from '#validators/users_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'

export default class UsersController {
  async signUp({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(signUpValidator)

    const verifyUser = await User.findBy('email', payload.email)

    if (verifyUser)
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'User already exists' }] })

    const newUser = await User.create(payload)

    const token = await auth.use('jwt').generate(newUser)

    return response.status(StatusCodes.CREATED).json(token)
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const verifyUser = await User.verifyCredentials(email, password)

    if (!verifyUser)
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ errors: [{ message: 'User does not exists' }] })

    const token = await auth.use('jwt').generate(verifyUser)

    return response.status(StatusCodes.OK).json(token)
  }
}
