import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Customer from './customer.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class PhoneNumber extends BaseModel {
  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @column({ serializeAs: null, isPrimary: true })
  declare id: number

  @column({ serializeAs: null })
  declare customerId: number

  @column()
  declare phoneNumber: string

  @column.dateTime({ serializeAs: null, autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ serializeAs: null, autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
