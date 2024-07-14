import PhoneNumber from '#models/phone_number'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await PhoneNumber.createMany([
      {
        customerId: 1,
        ddd: '11',
        phoneNumber: '94324-2453',
      },
      {
        customerId: 2,
        ddd: '21',
        phoneNumber: '91038-9067',
      },
    ])
  }
}
