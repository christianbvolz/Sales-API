import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table
        .integer('customer_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('customers')
        .onDelete('CASCADE')
      table.string('cep').notNullable()
      table.string('street').notNullable()
      table.string('street_number').notNullable()
      table.string('neighborhood').notNullable()
      table.string('city').notNullable()
      table.string('state').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
