import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import Sale from '#models/sale'
import {
  createCustomer,
  createProduct,
  createSale,
  createUser,
  customer1,
  product1,
  product2,
  sale1,
  sale2,
  sale3,
} from '../data_for_tests.js'
import Customer from '#models/customer'

const baseUrl = '/api/customers/'

test.group('Customers delete', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('customers').delete()
    await db.from('products').delete()
    await db.from('sales').delete()
  })

  test('should delete an existing customer with your sales', async ({ client, assert }) => {
    const token = await createUser(client)
    const { id: customerId } = await createCustomer(customer1)
    const { id: productId1 } = await createProduct(product1)
    const { id: productId2 } = await createProduct(product2)
    await createSale({ customerId, productId: productId1, ...sale1 })
    await createSale({ customerId, productId: productId2, ...sale2 })
    await createSale({ customerId, productId: productId1, ...sale3 })
    const numberOfCreatedSales = 3
    const numberOfSalesAfterDelete = 0

    let CustomerSales = await Sale.query().where('customerId', customerId)

    assert.equal(CustomerSales.length, numberOfCreatedSales)

    const deletedCustomer = await client.delete(baseUrl + customerId).header('Authorization', token)

    CustomerSales = await Sale.query().where('customerId', customerId)

    assert.equal(CustomerSales.length, numberOfSalesAfterDelete)

    deletedCustomer.assertStatus(StatusCodes.OK)

    assert.equal(deletedCustomer.body().message, 'Customer deleted')
  })

  test('should not delete a customer not found', async ({ client, assert }) => {
    const token = await createUser(client)
    await createCustomer(customer1)
    const idDoesntExist = 100

    const deletedCustomer = await client
      .delete(baseUrl + idDoesntExist)
      .header('Authorization', token)

    deletedCustomer.assertStatus(StatusCodes.CONFLICT)

    assert.equal(deletedCustomer.body().errors[0].message, 'Customer does not exist')
  })

  test('should trigger a "Unauthorized access" message', async ({ client, assert }) => {
    const { id } = await createCustomer(customer1)

    const response = await client.delete(baseUrl + id)

    response.assertStatus(StatusCodes.UNAUTHORIZED)

    const customer = await Customer.find(id)

    assert.isNotNull(customer)
  })
})
