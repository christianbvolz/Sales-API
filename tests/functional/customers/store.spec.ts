import { test } from '@japa/runner'
import { createUser, customer1, customerSameCpf, customerSamePhone } from '../data.js'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'

const baseUrl = '/api/customers'

test.group('Customers store', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('customers').delete()
  })

  test('should create a new customer', async ({ client, assert }) => {
    const token = await createUser(client)
    const customerResponse = await client
      .post(baseUrl)
      .json(customer1)
      .header('Authorization', token)

    customerResponse.assertStatus(StatusCodes.CREATED)

    assert.equal(customerResponse.body().customerId, 1)
  })

  test('should not create a new customer if there is already a customer with the same CPF registered', async ({
    client,
    assert,
  }) => {
    const token = await createUser(client)

    await client.post(baseUrl).json(customer1).header('Authorization', token)

    const customerSameCpfResponse = await client
      .post(baseUrl)
      .json(customerSameCpf)
      .header('Authorization', token)

    customerSameCpfResponse.assertStatus(409)

    assert.equal(customerSameCpfResponse.body().errors[0].message, 'Customer already exists')
  })

  test('should not create a new customer if there is already a customer with the same Phone registered', async ({
    client,
    assert,
  }) => {
    const token = await createUser(client)

    await client.post(baseUrl).json(customer1).header('Authorization', token)

    const customerSamePhoneResponse = await client
      .post(baseUrl)
      .json(customerSamePhone)
      .header('Authorization', token)

    customerSamePhoneResponse.assertStatus(409)

    assert.equal(customerSamePhoneResponse.body().errors[0].message, 'PhoneNumber already exists')
  })
})
