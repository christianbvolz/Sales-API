import { ApiClient } from '@japa/api-client'

export const createUser = async (client: ApiClient) => {
  const userCreated = await client.post('/api/signup').json(newUser)
  return 'Bearer ' + userCreated.body().token
}

export const newUser = {
  firstName: 'Sourim',
  lastName: 'Welon',
  email: 'welon.Sourim@gmail.com',
  password: 'superpassword',
}

export const user = {
  email: 'welon.Sourim@gmail.com',
  password: 'superpassword',
}

export const customer1 = {
  fullName: 'Camus Temis',
  cpf: '795.926.140-75',
  phoneNumber: '(11) 94743-9453',
  address: {
    cep: '75126-240',
    street: 'Rua Sabará',
    streetNumber: '405',
    neighborhood: 'Parque São João',
    city: 'Anápolis',
    state: 'GO',
  },
}

export const customer2 = {
  fullName: 'Naobi Sevima',
  cpf: '134.745.963-54',
  phoneNumber: '(53) 91038-9067',
  address: {
    cep: '69315-006',
    street: 'Rua Rio Cotingo',
    streetNumber: '8098',
    neighborhood: 'Professora Araceli Souto Maior',
    city: 'Boa Vista',
    state: 'RR',
  },
}

export const customerSameCpf = {
  fullName: 'Lasel Zeuta',
  cpf: '795.926.140-75',
  phoneNumber: '(21) 91365-8604',
  address: {
    cep: '64034-425',
    street: 'Rua Capitão Gabriel Leite',
    streetNumber: '139',
    neighborhood: 'Angelim',
    city: 'Teresina',
    state: 'PI',
  },
}

export const customerSamePhone = {
  fullName: 'Pitor Mufue',
  cpf: '268.948.950-31',
  phoneNumber: '(11) 94743-9453',
  address: {
    cep: '66635-795',
    street: 'Rua dos Cravos',
    streetNumber: '33',
    neighborhood: 'Parque Verde',
    city: 'Belém',
    state: 'PA',
  },
}
