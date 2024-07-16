import vine from '@vinejs/vine'

const loginSchema = vine.object({
  email: vine.string().email(),
  password: vine.string().minLength(8),
})

export const loginValidator = vine.compile(loginSchema)

export const signUpValidator = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    ...loginSchema.getProperties(),
  })
)
