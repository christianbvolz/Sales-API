import PhoneNumber from '#models/phone_number'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await PhoneNumber.createMany([
      {
        customerId: 1,
        phoneNumber: '(11) 94324-2453',
      },
      {
        customerId: 2,
        phoneNumber: '(53) 91038-9067',
      },
    ])
  }
}
