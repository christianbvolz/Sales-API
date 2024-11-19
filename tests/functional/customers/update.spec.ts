import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import { createCustomer, createUser, customer1, customer2, customerToUpdate } from '../data_for_tests.js'
import PhoneNumber from '#models/phone_number'

const baseUrl = '/api/customers/'

test.group('Customers update', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('customers').delete()
  })

  test('should update an existing customer', async ({ client, assert }) => {
    const token = await createUser(client)
    const { id } = await createCustomer(customer1)

    const updatedCustomer = await client
      .put(baseUrl + id)
      .json(customerToUpdate)
      .header('Authorization', token)

    updatedCustomer.assertStatus(StatusCodes.OK)

    assert.equal(updatedCustomer.body().message, 'Customer updated')
  })

  test('should not update a customer not found', async ({ client, assert }) => {
    const token = await createUser(client)
    await createCustomer(customer1)
    const idDoesntExist = 100

    const updatedCustomer = await client
      .put(baseUrl + idDoesntExist)
      .json(customerToUpdate)
      .header('Authorization', token)

    updatedCustomer.assertStatus(StatusCodes.CONFLICT)

    assert.equal(updatedCustomer.body().errors[0].message, 'Customer does not exist')
  })

  test('should not update a customer if there is already a customer with the same CPF registered', async ({
    client,
    assert,
  }) => {
    const token = await createUser(client)
    await createCustomer(customer1)
    const { id } = await createCustomer(customer2)

    const updatedCustomer = await client
      .put(baseUrl + id)
      .json({ cpf: customer1.cpf })
      .header('Authorization', token)

    updatedCustomer.assertStatus(StatusCodes.CONFLICT)

    assert.equal(updatedCustomer.body().errors[0].message, 'CPF already registered')
  })

  test('should not update a customer if there is already a customer with the same Phone registered', async ({
    client,
    assert,
  }) => {
    const token = await createUser(client)
    await createCustomer(customer1)
    const { id } = await createCustomer(customer2)

    const updatedCustomer = await client
      .put(baseUrl + id)
      .json({ phoneNumber: customer1.phoneNumber })
      .header('Authorization', token)

    updatedCustomer.assertStatus(StatusCodes.CONFLICT)

    assert.equal(updatedCustomer.body().errors[0].message, 'PhoneNumber already registered')
  })

  test('should trigger a "Unauthorized access" message', async ({ client, assert }) => {
    const { id } = await createCustomer(customer2)

    const response = await client.put(baseUrl + id).json({ phoneNumber: customer1.phoneNumber })

    response.assertStatus(StatusCodes.UNAUTHORIZED)

    const phoneNumberDb = await PhoneNumber.findBy('customerId', id)

    assert.equal(customer2.phoneNumber, phoneNumberDb?.phoneNumber)
    assert.notEqual(customer1.phoneNumber, phoneNumberDb?.phoneNumber)
  })
})
