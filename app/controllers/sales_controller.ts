import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import { storeSaleValidator } from '#validators/sales_validator'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { StatusCodes } from 'http-status-codes'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    const { customerId, productId, quantity } = await request.validateUsing(storeSaleValidator)

    const customer = await Customer.find(customerId)

    if (!customer)
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ errors: [{ message: 'Customer does not exist' }] })

    const product = await Product.find(productId)

    if (!product)
      return response
        .status(StatusCodes.NOT_FOUND)
        .json({ errors: [{ message: 'Product does not exist' }] })

    const newProductQuantity = product.quantity - quantity

    if (newProductQuantity < 0)
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'quantity exceeded the quantity of product in stock' }] })

    const trx = await db.transaction()

    const unitPrice = product.price
    const totalPrice = unitPrice * quantity
    let sale: Sale
    try {
      product.useTransaction(trx)

      await product.merge({ quantity: newProductQuantity }).save()

      if (newProductQuantity === 0) await product.delete()

      sale = await Sale.create(
        { customerId, productId, quantity, unitPrice, totalPrice },
        { client: trx }
      )

      await trx.commit()
    } catch (error) {
      await trx.rollback()
      return response.internalServerError()
    }

    return response.created(sale)
  }
}
