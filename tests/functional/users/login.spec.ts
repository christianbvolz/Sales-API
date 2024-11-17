import User from '#models/user'
import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import { user, newUser } from '../data.js'
import db from '@adonisjs/lucid/services/db'

const baseUrl = '/api/login'

const tokenRegex = /^[\w-]+\.[\w-]+\.[\w-]+$/

test.group('Users login', async (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
  })

  test('should login user', async ({ client, assert }) => {
    await User.create(newUser)
    const response = await client.post(baseUrl).json(user)

    const userDb = await User.findBy('email', user.email)

    assert.isNotNull(userDb)

    response.assertStatus(StatusCodes.OK)

    assert.isTrue(tokenRegex.test(response.body().token))
  })

  test('should response an error message "The email field must be a valid email address" when email is not valid', async ({
    client,
    assert,
  }) => {
    const response = await client.post(baseUrl).json({ ...user, email: 'undefined' })

    response.assertStatus(StatusCodes.UNPROCESSABLE_ENTITY)
    assert.equal(response.body().errors[0].message, 'The email field must be a valid email address')
  })

  test('should response an error message "The password field must have at least 8 characters" when the password is less than 8 characters', async ({
    client,
    assert,
  }) => {
    const response = await client.post(baseUrl).json({ ...user, password: 'pass' })

    response.assertStatus(StatusCodes.UNPROCESSABLE_ENTITY)
    assert.equal(
      response.body().errors[0].message,
      'The password field must have at least 8 characters'
    )
  })
})
