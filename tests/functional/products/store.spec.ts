import { test } from '@japa/runner'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import { createUser, product1, product2 } from '../data_for_tests.js'
import Product from '#models/product'

const baseUrl = '/api/products/'

const imagesDir = './public/images/'

const imageForTest = 'testImage1.jpg'

test.group('Products store', (group) => {
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

  test('should store a new product', async ({ client, assert }) => {
    const token = await createUser(client)

    const createdProduct = await client
      .post(baseUrl)
      .header('Authorization', token)
      .fields(product1)
      .file('image', fs.createReadStream(imagesDir + imageForTest))

    createdProduct.assertStatus(StatusCodes.CREATED)

    const productDb = await Product.find(createdProduct.body().productId)

    assert.isNotNull(productDb)

    assert.isTrue(fs.existsSync(imagesDir + productDb?.image))

    const { title, description, price, quantity } = productDb as Product

    assert.equal(title, product1.title)
    assert.equal(description, product1.description)
    assert.equal(price, product1.price)
    assert.equal(quantity, product1.quantity)
  })

  test('should trigger a "Unauthorized access" message', async ({ client, assert }) => {
    const response = await client
      .post(baseUrl)
      .fields(product1)
      .file('image', fs.createReadStream(imagesDir + imageForTest))

    response.assertStatus(StatusCodes.UNAUTHORIZED)

    const products = await Product.all()

    assert.empty(products)

    fs.readdir(imagesDir, (errDir, files) => {
      if (errDir) {
        console.error(errDir)
      } else {
        assert.isFalse(files.some((file) => !file.includes('testImage')))
      }
    })
  })
})
