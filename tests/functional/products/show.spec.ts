import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import { createUser, product1, product2 } from '../data_for_tests.js'

const baseUrl = '/api/products/'

const imagesDir = './public/images/'

const imageForTest = 'testImage1.jpg'

test.group('Products show', (group) => {
  group.each.setup(async () => {
    await db.from('users').delete()
    await db.from('products').delete()
  })

  group.each.teardown(async () => {
    fs.readdir(imagesDir, (errDir, files) => {
      if (errDir) {
        console.error(errDir)
      } else {
        files
          .filter((file) => !file.includes('testImage'))
          .forEach((file) => {
            fs.unlink(imagesDir + file, (err) => {
              if (err) throw err
            })
          })
      }
    })
  })

  test('should show a product', async ({ client, assert }) => {
    const token = await createUser(client)

    const createdProduct = await client
      .post(baseUrl)
      .header('Authorization', token)
      .fields(product1)
      .file('image', fs.createReadStream(imagesDir + imageForTest))

    const { productId } = createdProduct.body()

    const productResponse = await client.get(baseUrl + productId).header('Authorization', token)

    productResponse.assertStatus(StatusCodes.OK)

    const productDb = productResponse.body()

    const {
      title: titleProductDb,
      description: descriptionProductDb,
      price: priceProductDb,
      quantity: quantityProductDb,
    } = productDb

    assert.equal(titleProductDb, product1.title)
    assert.equal(descriptionProductDb, product1.description)
    assert.equal(priceProductDb, product1.price)
    assert.equal(quantityProductDb, product1.quantity)
  })

  test('should trigger a "Unauthorized access" message', async ({ client }) => {
    const token = await createUser(client)

    const createdProduct = await client
      .post(baseUrl)
      .header('Authorization', token)
      .fields(product1)
      .file('image', fs.createReadStream(imagesDir + imageForTest))

    const { productId } = createdProduct.body()

    const response = await client.get(baseUrl + productId)

    response.assertStatus(StatusCodes.UNAUTHORIZED)
  })
})
