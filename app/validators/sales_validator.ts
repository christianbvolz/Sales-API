import vine from '@vinejs/vine'

export const storeSaleValidator = vine.compile(
  vine.object({
    customerId: vine.number().min(1).withoutDecimals(),
    productId: vine.number().min(1).withoutDecimals(),
    quantity: vine.number().min(1).withoutDecimals(),
  })
)
