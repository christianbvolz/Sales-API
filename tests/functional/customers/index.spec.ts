import { test } from '@japa/runner'
import { createCustomer, createUser, customer1, customer2 } from '../data_for_tests.js'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'

const baseUrl = '/api/customers'

test.group('Customers index', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('customers').delete()
  })

  test('should show all customers order by id', async ({ client, assert }) => {
    const token = await createUser(client)
    const { cpf: customerCpf1 } = await createCustomer(customer1)
    const { cpf: customerCpf2 } = await createCustomer(customer2)
    const numberOfCreatedCustomers = 2

    const response = await client.get(baseUrl).header('Authorization', token)

    const customers = response.body()

    response.assertStatus(StatusCodes.OK)

    assert.equal(customers.length, numberOfCreatedCustomers)

    const customersCpf = customers.map((customer: { cpf: string }) => customer.cpf)
    assert.deepEqual(customersCpf, [customerCpf1, customerCpf2])
  })

  test('should trigger a "Unauthorized access" message', async ({ client }) => {
    const response = await client.get(baseUrl)

    response.assertStatus(StatusCodes.UNAUTHORIZED)
  })
})
