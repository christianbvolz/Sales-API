import Customer from '#models/customer'
import Product from '#models/product'
import Sale from '#models/sale'
import { storeSaleValidator } from '#validators/sales_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'

export default class SalesController {
  async store({ request, response }: HttpContext) {
    const { customerId, productId, quantity } = await request.validateUsing(storeSaleValidator)

    const customer = await Customer.find(customerId)

    if (!customer)
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'Customer does not exist' }] })

    const product = await Product.find(productId)

    if (!product)
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'Product does not exist' }] })

    const unitPrice = product.price
    const totalPrice = unitPrice * quantity

    await Sale.create({ customerId, productId, quantity, unitPrice, totalPrice })

    return response.created()
  }
}
