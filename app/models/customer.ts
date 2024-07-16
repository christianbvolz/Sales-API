import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import PhoneNumber from './phone_number.js'
import type { HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Address from './address.js'
import Product from './product.js'

export default class Customer extends BaseModel {
  @hasOne(() => PhoneNumber)
  declare phoneNumber: HasOne<typeof PhoneNumber>

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @manyToMany(() => Product)
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
