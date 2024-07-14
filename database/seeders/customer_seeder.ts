import Customer from '#models/customer'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Customer.createMany([
      {
        fullName: 'virkus full',
        cpf: '549.367.346-23',
      },
      {
        fullName: 'romain super',
        cpf: '134.745.963-54',
      },
    ])
  }
}
