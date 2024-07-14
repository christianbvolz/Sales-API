import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        firstName: 'virk',
        lastName: 'adonisjs',
        email: 'virk@adonisjs.com',
        password: 'secret',
      },
      {
        firstName: 'romain',
        lastName: 'adonisjs',
        email: 'romain@adonisjs.com',
        password: 'supersecret',
      },
    ])
  }
}
