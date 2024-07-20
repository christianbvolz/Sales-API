import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'
import fs from 'node:fs'
import { StatusCodes } from 'http-status-codes'
import {
  showOrDeleteProductValidator,
  storeProductValidator,
  updateProductValidator,
} from '#validators/products_validator'

export default class ProductsController {
  async index({ response }: HttpContext) {
    const products = await Product.query().orderBy('title', 'asc')

    if (!products)
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ errors: [{ message: 'Products not found' }] })

    return response.ok(products)
  }

  async show({ request, response }: HttpContext) {
    const {
      params: { productId },
    } = await request.validateUsing(showOrDeleteProductValidator)

    const product = await Product.find(productId)

    if (!product)
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ errors: [{ message: 'Product not found' }] })

    return response.ok(product?.$original)
  }

  async store({ request, response }: HttpContext) {
    const { title, description, price, quantity, image } =
      await request.validateUsing(storeProductValidator)

    const imageName = `${cuid()}.${image.extname}`

    const trx = await db.transaction()

    const product = await Product.create(
      {
        title,
        description,
        price,
        quantity,
        image: imageName,
      },
      { client: trx }
    )

    try {
      await image.move(app.makePath('public/images'), {
        name: imageName,
      })

      await product.save()

      await trx.commit()
    } catch (error) {
      await trx.rollback()

      fs.unlink(`./public/images/${imageName}`, (err) => {
        if (err) {
          console.error(err)
        } else {
          console.log('File is deleted.')
        }
      })
    }
    return response.status(StatusCodes.CREATED).json(product)
  }

  async update({ request, response }: HttpContext) {
    const {
      params: { productId },
      title,
      description,
      price,
      quantity,
      image,
      deletedAt,
    } = await request.validateUsing(updateProductValidator)

    const product = await Product.withTrashed().where('id', productId).firstOrFail()

    if (!product)
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ errors: [{ message: 'Product not found' }] })

    const trx = await db.transaction()

    try {
      product.useTransaction(trx)

      await product.merge({ title, description, price, quantity, deletedAt }).save()

      if (image) {
        await image.move(app.makePath('public/images'), {
          name: product.image,
        })
      }

      await trx.commit()
    } catch (error) {
      await trx.rollback()
    }
    return response.ok(product)
  }

  async delete({ request, response }: HttpContext) {
    const {
      params: { productId },
    } = await request.validateUsing(showOrDeleteProductValidator)

    const product = await Product.find(productId)

    if (!product)
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ errors: [{ message: 'Product not found' }] })

    await product.delete()

    return response.ok(product)
  }
}
