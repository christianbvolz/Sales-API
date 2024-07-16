import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const customerSchema = vine.object({
  fullName: vine.string(),
  cpf: vine.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/), //  cpf format 000.000.000-00
  phoneNumber: vine
    .string()
    .regex(
      /^\((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/
    ), //  phoneNumber format (00) 00000-0000 or (00) 0000-0000
  address: vine.object({
    cep: vine.string().regex(/^\d{5}[-]\d{3}$/), //  cep format 00000-000
    street: vine.string(),
    streetNumber: vine.number(),
    neighborhood: vine.string(),
    city: vine.string(),
    state: vine.string().fixedLength(2).toUpperCase().alpha({
      allowSpaces: false,
      allowUnderscores: false,
      allowDashes: false,
    }),
  }),
})

export const createCustomerValidator = vine.compile(customerSchema)

export const updateCustomerValidator = vine.compile(
  vine.object({
    ...customerSchema.getProperties(),
    params: vine.object({
      customerId: vine.number().min(1),
    }),
  })
)

const message = {
  'cpf.regex': 'The cpf field format is invalid. Example of valid format: 000.000.000-00',
  'address.cep.regex': 'The cep field format is invalid. Example of valid format: 00000-000',
  'phoneNumber.regex':
    'The phoneNumber field format is invalid. Example of valid format: (00) 00000-0000 or (00) 0000-0000',
}

vine.messagesProvider = new SimpleMessagesProvider(message)
