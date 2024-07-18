import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Sale from './sale.js'

export default class Product extends BaseModel {
  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @manyToMany(() => Customer, {
    pivotTable: 'sales',
    pivotTimestamps: true,
  })
  declare customer: ManyToMany<typeof Customer>

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column()
  declare image: string

  @column.dateTime({ serializeAs: null, autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
