import Customer from '#models/customer'
import { createCustomerValidator, updateCustomerValidator } from '#validators/customers_validator'
import type { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'
import db from '@adonisjs/lucid/services/db'
import PhoneNumber from '#models/phone_number'

export default class CustomersController {
  async index({ response }: HttpContext) {
    const customers = await Customer.query().preload('address').preload('phoneNumber')

    return response.status(StatusCodes.CREATED).json(customers)
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
    const { params, cpf, fullName } = await request.validateUsing(updateCustomerValidator)
    // const customers = await Customer.query()
    //   .where('id', params.customerId)
    //   .update({ fullName, cpf })

    return response.status(StatusCodes.OK).json({ params, cpf, fullName })
  }
}
