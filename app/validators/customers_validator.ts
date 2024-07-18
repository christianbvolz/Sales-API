import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const showCustomerValidator = vine.compile(
  vine
    .object({
      params: vine.object({
        customerId: vine.number().min(1).withoutDecimals(),
      }),
      month: vine.number().min(1).max(12).withoutDecimals().optional(),
      year: vine.number().min(1).withoutDecimals().optional(),
    })
    .allowUnknownProperties()
)

export const createCustomerValidator = vine.compile(
  vine.object({
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
)

export const updateCustomerValidator = vine.compile(
  vine.object({
    params: vine.object({
      customerId: vine.number().min(1).withoutDecimals(),
    }),
    fullName: vine.string().optional(),
    cpf: vine
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
      .optional(), //  cpf format 000.000.000-00
    phoneNumber: vine
      .string()
      .regex(
        /^\((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\) (?:[2-8]|9[0-9])[0-9]{3}\-[0-9]{4}$/
      )
      .optional(), //  phoneNumber format (00) 00000-0000 or (00) 0000-0000
    address: vine
      .object({
        cep: vine
          .string()
          .regex(/^\d{5}[-]\d{3}$/)
          .optional(), //  cep format 00000-000
        street: vine.string().optional(),
        streetNumber: vine.number().optional(),
        neighborhood: vine.string().optional(),
        city: vine.string().optional(),
        state: vine
          .string()
          .fixedLength(2)
          .toUpperCase()
          .alpha({
            allowSpaces: false,
            allowUnderscores: false,
            allowDashes: false,
          })
          .optional(),
      })
      .optional(),
  })
)

export const deleteCustomerValidator = vine.compile(
  vine.object({
    params: vine.object({
      customerId: vine.number().min(1).withoutDecimals(),
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
