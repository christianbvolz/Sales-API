import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'

const user = {
  firstName: 'name',
  lastName: 'last',
  email: 'test@adonisjs.com',
  password: 'superpassword',
}

const baseUrl = '/api/login'

const tokenRegex = /^[\w-]+\.[\w-]+\.[\w-]+$/

test.group('Users login', async (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('should login user', async ({ client, assert }) => {
    await User.create(user)
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
