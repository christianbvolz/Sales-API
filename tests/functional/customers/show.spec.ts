import { test } from '@japa/runner'
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
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import Sale from '#models/sale'

const baseUrl = '/api/customers/'

test.group('Customers show', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('customers').delete()
    await db.from('products').delete()
    await db.from('sales').delete()
  })

  test('should show an existing customer with your sales', async ({ client, assert }) => {
    const token = await createUser(client)
    const { id: customerId } = await createCustomer(customer1)
    const { id: productId1 } = await createProduct(product1)
    const { id: productId2 } = await createProduct(product2)
    const createdSale1 = await createSale({ customerId, productId: productId1, ...sale1 })
    const createdSale2 = await createSale({ customerId, productId: productId2, ...sale2 })
    const createdSale3 = await createSale({ customerId, productId: productId1, ...sale3 })
    const numberOfCreatedSales = 3

    const response = await client.get(baseUrl + customerId).header('Authorization', token)

    const customerWithSales = response.body()

    response.assertStatus(StatusCodes.OK)

    assert.equal(customerWithSales.cpf, customer1.cpf)

    assert.equal(customerWithSales.sales.length, numberOfCreatedSales)

    const salesIds = customerWithSales.sales.map(({ id }: Sale) => id)
    assert.deepEqual(salesIds, [createdSale2.id, createdSale1.id, createdSale3.id])
  })

  test('should show an existing customer with your sales filter by month', async ({
    client,
    assert,
  }) => {
    const token = await createUser(client)
    const { id: customerId } = await createCustomer(customer1)
    const { id: productId1 } = await createProduct(product1)
    const { id: productId2 } = await createProduct(product2)
    const createdSale = await createSale({ customerId, productId: productId2, ...sale2 })
    await createSale({ customerId, productId: productId1, ...sale1 })
    await createSale({ customerId, productId: productId1, ...sale3 })

    const response = await client
      .get(baseUrl + customerId)
      .header('Authorization', token)
      .qs('month', sale2.createdAt.month)

    const numberOfCreatedSalesAfterFilter = 1

    const customerWithSales = response.body()

    response.assertStatus(StatusCodes.OK)

    assert.equal(customerWithSales.cpf, customer1.cpf)

    assert.equal(customerWithSales.sales.length, numberOfCreatedSalesAfterFilter)

    assert.equal(customerWithSales.sales[0].id, createdSale.id)
  })

  test('should show an existing customer with your sales filter by year', async ({
    client,
    assert,
  }) => {
    const token = await createUser(client)
    const { id: customerId } = await createCustomer(customer1)
    const { id: productId1 } = await createProduct(product1)
    const { id: productId2 } = await createProduct(product2)
    const createdSale1 = await createSale({ customerId, productId: productId1, ...sale1 })
    const createdSale2 = await createSale({ customerId, productId: productId2, ...sale2 })
    await createSale({ customerId, productId: productId1, ...sale3 })

    const response = await client
      .get(baseUrl + customerId)
      .header('Authorization', token)
      .qs('year', sale1.createdAt.year)

    const numberOfCreatedSalesAfterFilter = 2

    const customerWithSales = response.body()

    response.assertStatus(StatusCodes.OK)

    assert.equal(customerWithSales.cpf, customer1.cpf)

    assert.equal(customerWithSales.sales.length, numberOfCreatedSalesAfterFilter)

    const salesIds = customerWithSales.sales.map(({ id }: Sale) => id)
    assert.deepEqual(salesIds, [createdSale2.id, createdSale1.id])
  })

  test('should show an existing customer with your sales filter by year and month', async ({
    client,
    assert,
  }) => {
    const token = await createUser(client)
    const { id: customerId } = await createCustomer(customer1)
    const { id: productId1 } = await createProduct(product1)
    const { id: productId2 } = await createProduct(product2)
    const createdSale = await createSale({ customerId, productId: productId1, ...sale1 })
    await createSale({ customerId, productId: productId2, ...sale2 })
    await createSale({ customerId, productId: productId1, ...sale3 })

    const response = await client
      .get(baseUrl + customerId)
      .header('Authorization', token)
      .qs('month', sale1.createdAt.month)
      .qs('year', sale1.createdAt.year)

    const numberOfCreatedSalesAfterFilter = 1

    const customerWithSales = response.body()

    response.assertStatus(StatusCodes.OK)

    assert.equal(customerWithSales.cpf, customer1.cpf)

    assert.equal(customerWithSales.sales.length, numberOfCreatedSalesAfterFilter)

    assert.equal(customerWithSales.sales[0].id, createdSale.id)
  })

  test('should trigger a "Customer does not exist" error message', async ({ client, assert }) => {
    const token = await createUser(client)
    const idDoesntExist = 100

    const response = await client.get(baseUrl + idDoesntExist).header('Authorization', token)

    response.assertStatus(StatusCodes.CONFLICT)

    assert.equal(response.body().errors[0].message, 'Customer does not exist')
  })

  test('should trigger a "Unauthorized access" message', async ({ client }) => {
    const { id } = await createCustomer(customer1)
    const response = await client.get(baseUrl + id)

    response.assertStatus(StatusCodes.UNAUTHORIZED)
  })
})
