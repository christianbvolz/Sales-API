import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import { createUser, product1, product2 } from '../data_for_tests.js'

const baseUrl = '/api/products/'

const imagesDir = './public/images/'

const imageForTest1 = 'testImage1.jpg'

const imageForTest2 = 'testImage2.jpg'

test.group('Products index', (group) => {
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

  test('should show all products', async ({ client, assert }) => {
    const token = await createUser(client)

    await client
      .post(baseUrl)
      .header('Authorization', token)
      .fields(product1)
      .file('image', fs.createReadStream(imagesDir + imageForTest1))

    await client
      .post(baseUrl)
      .header('Authorization', token)
      .fields(product2)
      .file('image', fs.createReadStream(imagesDir + imageForTest2))

    const productsResponse = await client.get(baseUrl).header('Authorization', token)

    const products = productsResponse.body()

    productsResponse.assertStatus(StatusCodes.OK)

    assert.lengthOf(products, 2)

    const { title: titleProduct1, price: priceProduct1, quantity: quantityProduct1 } = products[1]

    const { title: titleProduct2, price: priceProduct2, quantity: quantityProduct2 } = products[0]

    assert.equal(titleProduct1, product1.title)
    assert.equal(priceProduct1, product1.price)
    assert.equal(quantityProduct1, product1.quantity)

    assert.equal(titleProduct2, product2.title)
    assert.equal(priceProduct2, product2.price)
    assert.equal(quantityProduct2, product2.quantity)
  })

  test('should trigger a "Unauthorized access" message', async ({ client }) => {
    const response = await client.get(baseUrl)

    response.assertStatus(StatusCodes.UNAUTHORIZED)
  })
})
