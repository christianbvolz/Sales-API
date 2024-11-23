import { test } from '@japa/runner'
import {
  createCustomer,
  createUser,
  customer1,
  customerSameCpf,
  customerSamePhone,
} from '../data_for_tests.js'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import Customer from '#models/customer'
import PhoneNumber from '#models/phone_number'
import Address from '#models/address'

const baseUrl = '/api/customers/'

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

    const customerDb = await Customer.findBy('cpf', customer1.cpf)

    const phone = await PhoneNumber.findBy('customerId', customerDb?.id)

    const address = await Address.findBy('customerId', customerDb?.id)

    customerResponse.assertStatus(StatusCodes.CREATED)

    assert.equal(customerResponse.body().customerId, customerDb?.id)

    assert.equal(phone?.phoneNumber, customer1.phoneNumber)

    assert.equal(address?.street, customer1.address.street)
  })

  test('should not create a new customer if there is already a customer with the same CPF registered', async ({
    client,
    assert,
  }) => {
    const token = await createUser(client)

    await createCustomer(customer1)

    const customerSameCpfResponse = await client
      .post(baseUrl)
      .json(customerSameCpf)
      .header('Authorization', token)

    customerSameCpfResponse.assertStatus(StatusCodes.CONFLICT)

    assert.equal(customerSameCpfResponse.body().errors[0].message, 'Customer already exists')
  })

  test('should not create a new customer if there is already a customer with the same Phone registered', async ({
    client,
    assert,
  }) => {
    const token = await createUser(client)

    await createCustomer(customer1)

    const customerSamePhoneResponse = await client
      .post(baseUrl)
      .json(customerSamePhone)
      .header('Authorization', token)

    customerSamePhoneResponse.assertStatus(StatusCodes.CONFLICT)

    assert.equal(customerSamePhoneResponse.body().errors[0].message, 'PhoneNumber already exists')
  })

  test('should trigger a "Unauthorized access" message', async ({ client, assert }) => {
    const response = await client.post(baseUrl).json(customer1)

    const customers = await Customer.all()

    response.assertStatus(StatusCodes.UNAUTHORIZED)

    assert.empty(customers)
  })
})
