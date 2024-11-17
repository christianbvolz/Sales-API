import User from '#models/user'
import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import { newUser } from '../data.js'
import db from '@adonisjs/lucid/services/db'

const baseUrl = '/api/signup'

const tokenRegex = /^[\w-]+\.[\w-]+\.[\w-]+$/

test.group('Users sign up', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
  })

  test('should create a new user', async ({ client, assert }) => {
    const response = await client.post(baseUrl).json(newUser)

    const newUserDb = await User.findBy('email', newUser.email)

    assert.isNotNull(newUserDb)

    response.assertStatus(StatusCodes.CREATED)

    assert.isTrue(tokenRegex.test(response.body().token))
  })

  test('should response an error message "The email field must be a valid email address"', async ({
    client,
    assert,
  }) => {
    const response = await client.post(baseUrl).json({ ...newUser, email: 'undefined' })

    response.assertStatus(StatusCodes.UNPROCESSABLE_ENTITY)
    assert.equal(response.body().errors[0].message, 'The email field must be a valid email address')
  })

  test('should response an error message "The password field must have at least 8 characters"', async ({
    client,
    assert,
  }) => {
    const response = await client.post(baseUrl).json({ ...newUser, password: 'pass' })

    response.assertStatus(StatusCodes.UNPROCESSABLE_ENTITY)
    assert.equal(
      response.body().errors[0].message,
      'The password field must have at least 8 characters'
    )
  })

  test('should response an error message "User already exists"', async ({ client, assert }) => {
    await User.create(newUser)
    const response = await client.post(baseUrl).json(newUser)

    response.assertStatus(StatusCodes.CONFLICT)
    assert.equal(response.body().errors[0].message, 'User already exists')
  })

  test('should response an error message "The firstName field must be defined"', async ({
    client,
    assert,
  }) => {
    const response = await client.post(baseUrl).json({ ...newUser, firstName: undefined })

    response.assertStatus(StatusCodes.UNPROCESSABLE_ENTITY)
    assert.equal(response.body().errors[0].message, 'The firstName field must be defined')
  })

  test('should response an error message "The lastName field must be defined"', async ({
    client,
    assert,
  }) => {
    const response = await client.post(baseUrl).json({ ...newUser, lastName: undefined })

    response.assertStatus(StatusCodes.UNPROCESSABLE_ENTITY)
    assert.equal(response.body().errors[0].message, 'The lastName field must be defined')
  })
})
