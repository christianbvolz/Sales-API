import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Sale from './sale.js'
import { compose } from '@adonisjs/core/helpers'
import { SoftDeletes } from 'adonis-lucid-soft-deletes'

export default class Product extends compose(BaseModel, SoftDeletes) {
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

  @column({ serializeAs: null })
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
  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null
}
