import { test } from '@japa/runner'
import {
  createCustomer,
  createProduct,
  createUser,
  customer1,
  product1,
  sale1,
} from '../data_for_tests.js'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import Sale from '#models/sale'

const baseUrl = '/api/sales/'

test.group('sales store', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('customers').delete()
  })

  test('should create a new sale', async ({ client, assert }) => {
    const token = await createUser(client)

    const { id: customerId } = await createCustomer(customer1)

    const { id: productId } = await createProduct(product1)

    const saleResponse = await client
      .post(baseUrl)
      .json({ customerId, productId, ...sale1 })
      .header('Authorization', token)

    saleResponse.assertStatus(StatusCodes.CREATED)

    const saleResponseBody = saleResponse.body()

    const sale = await Sale.find(saleResponseBody.id)

    assert.isNotNull(sale)
    assert.equal(sale?.id, saleResponseBody.id)
    assert.equal(sale?.quantity, saleResponseBody.quantity)
    assert.equal(sale?.unitPrice, saleResponseBody.unitPrice)
  })

  test('should trigger a "Unauthorized access" message', async ({ client, assert }) => {
    const { id: customerId } = await createCustomer(customer1)

    const { id: productId } = await createProduct(product1)

    const response = await client.post(baseUrl).json({ customerId, productId, ...sale1 })

    const sales = await Sale.all()

    response.assertStatus(StatusCodes.UNAUTHORIZED)

    assert.empty(sales)
  })
})
