import Address from '#models/address'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Address.createMany([
      {
        customerId: 1,
        cep: '75126-240',
        street: 'Rua Sabará',
        streetNumber: '405',
        neighborhood: 'Parque São João',
        city: 'Anápolis',
        state: 'GO',
      },
      {
        customerId: 2,
        cep: '69315-006',
        street: 'Rua Rio Cotingo',
        streetNumber: '8098',
        neighborhood: 'Professora Araceli Souto Maior',
        city: 'Boa Vista',
        state: 'RR',
      },
    ])
  }
}
