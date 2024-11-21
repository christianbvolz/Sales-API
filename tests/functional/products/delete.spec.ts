import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import { createUser, product1 } from '../data_for_tests.js'
import Product from '#models/product'

const baseUrl = '/api/products/'

const imagesDir = './public/images/'

const imageForTest = 'testImage1.jpg'

test.group('Products delete', (group) => {
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

  test('should delete an existing product', async ({ client, assert }) => {
    const token = await createUser(client)

    const createdProduct = await client
      .post(baseUrl)
      .header('Authorization', token)
      .fields(product1)
      .file('image', fs.createReadStream(imagesDir + imageForTest))

    const { productId } = createdProduct.body()

    const deleteResponse = await client.delete(baseUrl + productId).header('Authorization', token)

    deleteResponse.assertStatus(StatusCodes.OK)

    const productDb = (await Product.withTrashed().where('id', productId).firstOrFail()) as Product

    assert.isNotNull(productDb)

    assert.isTrue(fs.existsSync(imagesDir + productDb?.image))

    assert.exists(productDb?.deletedAt)
  })

  test('should trigger a "Unauthorized access" message', async ({ client, assert }) => {
    const token = await createUser(client)

    const createdProduct = await client
      .post(baseUrl)
      .header('Authorization', token)
      .fields(product1)
      .file('image', fs.createReadStream(imagesDir + imageForTest))

    const { productId } = createdProduct.body()

    const response = await client.delete(baseUrl + productId)

    response.assertStatus(StatusCodes.UNAUTHORIZED)

    const productDb = await Product.find(productId)

    assert.isNotNull(productDb)

    assert.isTrue(fs.existsSync(imagesDir + productDb?.image))
  })
})
