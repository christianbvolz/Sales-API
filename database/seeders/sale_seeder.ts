import Sale from '#models/sale'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    await Sale.createMany([
      {
        customerId: 1,
        productId: 1,
        quantity: 2,
        unitPrice: 15105.59,
        totalPrice: 30211.18,
        createdAt: DateTime.fromISO('2024-05-15'),
      },
      {
        customerId: 1,
        productId: 2,
        quantity: 3,
        unitPrice: 3999.95,
        totalPrice: 11999.85,
        createdAt: DateTime.fromISO('2024-07-12'),
      },
      {
        customerId: 1,
        productId: 2,
        quantity: 1,
        unitPrice: 3999.95,
        totalPrice: 3999.95,
        createdAt: DateTime.fromISO('2024-07-08'),
      },
      {
        customerId: 2,
        productId: 2,
        quantity: 1,
        unitPrice: 3999.95,
        totalPrice: 3999.95,
        createdAt: DateTime.fromISO('2023-05-27'),
      },
      {
        customerId: 1,
        productId: 4,
        quantity: 1,
        unitPrice: 529.99,
        totalPrice: 529.99,
        createdAt: DateTime.fromISO('2023-07-11'),
      },
      {
        customerId: 1,
        productId: 3,
        quantity: 1,
        unitPrice: 165.99,
        totalPrice: 165.99,
        createdAt: DateTime.fromISO('2024-07-07'),
      },
      {
        customerId: 1,
        productId: 3,
        quantity: 1,
        unitPrice: 165.99,
        totalPrice: 165.99,
        createdAt: DateTime.fromISO('2023-07-22'),
      },
    ])
  }
}
