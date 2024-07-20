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

  async filterByMonthOrYear(
    customerId: number,
    month: number | undefined,
    year: number | undefined
  ): Promise<Customer> {
    let customer: Customer
    if (month && year) {
      ;[customer] = await Customer.query()
        .where('id', customerId)
        .preload('phoneNumber')
        .preload('address')
        .preload('sales', (salesQuery) => {
          salesQuery
            .whereRaw('MONTH(`sales`.`created_at`) = ?', [month])
            .whereRaw('YEAR(`sales`.`created_at`) = ?', [year])
            .preload('products', (productsQuery) => {
              productsQuery.withTrashed()
            })
            .orderBy('created_at', 'desc')
        })
    } else if (month) {
      ;[customer] = await Customer.query()
        .where('id', customerId)
        .preload('phoneNumber')
        .preload('address')
        .preload('sales', (salesQuery) => {
          salesQuery
            .whereRaw('MONTH(`sales`.`created_at`) = ?', [month])
            .preload('products', (productsQuery) => {
              productsQuery.withTrashed()
            })
            .orderBy('created_at', 'desc')
        })
    } else if (year) {
      ;[customer] = await Customer.query()
        .where('id', customerId)
        .preload('phoneNumber')
        .preload('address')
        .preload('sales', (salesQuery) => {
          salesQuery
            .whereRaw('YEAR(`sales`.`created_at`) = ?', [year])
            .preload('products', (productsQuery) => {
              productsQuery.withTrashed()
            })
            .orderBy('created_at', 'desc')
        })
    } else {
      ;[customer] = await Customer.query()
        .where('id', customerId)
        .preload('phoneNumber')
        .preload('address')
        .preload('sales', (salesQuery) => {
          salesQuery
            .preload('products', (productsQuery) => {
              productsQuery.withTrashed()
            })
            .orderBy('created_at', 'desc')
        })
    }

    return customer
  }

  async show({ request, response }: HttpContext) {
    const {
      params: { customerId },
      month,
      year,
    } = await request.validateUsing(showCustomerValidator)

    const customer = await this.filterByMonthOrYear(customerId, month, year)

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

    await db.transaction(async (trx) => {
      const customer = await Customer.create({ fullName, cpf }, { client: trx })

      await customer.related('phoneNumber').create({ phoneNumber })

      await customer.related('address').create(address)
    })

    return response.created()
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

    return response.ok(customer)
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
