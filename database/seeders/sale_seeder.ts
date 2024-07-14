import Sale from '#models/sale'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Sale.createMany([
      {
        customerId: 1,
        productId: 1,
        quantity: 2,
        unitPrice: 15105.59,
        totalPrice: 30211.18,
      },
      {
        customerId: 1,
        productId: 2,
        quantity: 3,
        unitPrice: 3999.95,
        totalPrice: 11999.85,
      },
      {
        customerId: 2,
        productId: 2,
        quantity: 1,
        unitPrice: 3999.95,
        totalPrice: 3999.95,
      },
    ])
  }
}
