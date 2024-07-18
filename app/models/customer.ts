import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import PhoneNumber from './phone_number.js'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Address from './address.js'
import Product from './product.js'
import Sale from './sale.js'

export default class Customer extends BaseModel {
  @hasOne(() => PhoneNumber)
  declare phoneNumber: HasOne<typeof PhoneNumber>

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @manyToMany(() => Product, {
    pivotTable: 'sales',
    pivotTimestamps: true,
  })
  declare products: ManyToMany<typeof Product>

  @column({ serializeAs: null, isPrimary: true })
  declare id: number

  @column()
  declare fullName: string

  @column()
  declare cpf: string

  @column.dateTime({ serializeAs: null, autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
