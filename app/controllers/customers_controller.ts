import Customer from '#models/customer'
import {
  showCustomerValidator,
  createCustomerValidator,
  updateCustomerValidator,
  deleteCustomerValidator,
} from '#validators/customers_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import PhoneNumber from '#models/phone_number'
import Address from '#models/address'

export default class CustomersController {
  async index({ response }: HttpContext) {
    const customers = await Customer.query().preload('address').preload('phoneNumber')

    return response.ok(customers)
  }

  async show({ request, response }: HttpContext) {
    const {
      params: { customerId },
      month,
      year,
    } = await request.validateUsing(showCustomerValidator)

    const [customer] = await Customer.query()
      .where('id', customerId)
      .preload('phoneNumber')
      .preload('address')
      .preload('sales', (salesQuery) => {
        if (month && year) {
          salesQuery.whereRaw('MONTH(created_at) = ? AND YEAR(created_at) = ?', [month, year])
        } else if (month) {
          salesQuery.whereRaw('MONTH(created_at) = ?', [month])
        } else if (year) {
          salesQuery.whereRaw('YEAR(created_at) = ?', [year])
        }
        salesQuery
          .preload('products', (productsQuery) => {
            productsQuery.withTrashed()
          })
          .orderBy('created_at', 'desc')
      })

    if (!customer)
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'Customer does not exist' }] })

    return response.ok(customer)
  }

  async store({ request, response }: HttpContext) {
    const { fullName, cpf, phoneNumber, address } =
      await request.validateUsing(createCustomerValidator)

    const verifyCustomer = await Customer.findBy('cpf', cpf)

    if (verifyCustomer)
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'Customer already exists' }] })

    const verifyPhoneNumber = await PhoneNumber.findBy('phoneNumber', phoneNumber)

    if (verifyPhoneNumber)
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'PhoneNumber already exists' }] })

    const customer = await db.transaction(async (trx) => {
      const newCustomer = await Customer.create({ fullName, cpf }, { client: trx })

      await newCustomer.related('phoneNumber').create({ phoneNumber })

      await newCustomer.related('address').create(address)
      return newCustomer
    })

    return response.created({ customerId: customer.id })
  }

  async update({ request, response }: HttpContext) {
    const {
      params: { customerId },
      phoneNumber,
      fullName,
      cpf,
      address,
    } = await request.validateUsing(updateCustomerValidator)

    const customer = await Customer.find(customerId)

    if (!customer)
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'Customer does not exist' }] })

    if (cpf && (await Customer.findBy('cpf', cpf)))
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'CPF already registered' }] })

    if (phoneNumber && (await PhoneNumber.findBy('phoneNumber', phoneNumber)))
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'PhoneNumber already registered' }] })

    const trx = await db.transaction()

    try {
      customer.useTransaction(trx)
      const dbPhone = await PhoneNumber.findByOrFail('customerId', customerId, { client: trx })
      const dbAddress = await Address.findByOrFail('customerId', customerId, { client: trx })

      await customer.merge({ cpf, fullName }).save()
      await dbPhone.merge({ phoneNumber }).save()
      await dbAddress.merge({ ...address }).save()

      await trx.commit()
    } catch (error) {
      await trx.rollback()
    }

    return response.ok({ message: 'Customer updated' })
  }

  async delete({ request, response }: HttpContext) {
    const {
      params: { customerId },
    } = await request.validateUsing(deleteCustomerValidator)

    const customer = await Customer.find(customerId)

    if (!customer)
      return response
        .status(StatusCodes.CONFLICT)
        .json({ errors: [{ message: 'Customer does not exist' }] })

    await customer.delete()

    return response.ok({ message: 'Customer deleted' })
  }
}
