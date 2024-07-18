import vine from '@vinejs/vine'

export const showOrDeleteProductValidator = vine.compile(
  vine.object({
    params: vine.object({
      productId: vine.number().min(1).withoutDecimals(),
    }),
  })
)

export const storeProductValidator = vine.compile(
  vine.object({
    title: vine.string(),
    description: vine.string(),
    price: vine.number().min(0),
    quantity: vine.number().min(1).withoutDecimals(),
    image: vine.file({
      size: '10mb',
      extnames: ['jpg', 'png', 'jpeg', 'svg'],
    }),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    params: vine.object({
      productId: vine.number().min(1).withoutDecimals(),
    }),
    title: vine.string().optional(),
    description: vine.string().optional(),
    price: vine.number().min(0).optional(),
    quantity: vine.number().min(1).withoutDecimals().optional(),
    image: vine
      .file({
        size: '10mb',
        extnames: ['jpg', 'png', 'jpeg', 'svg'],
      })
      .optional(),
  })
)
