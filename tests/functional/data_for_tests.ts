import Address from '#models/address'
import Customer from '#models/customer'
import PhoneNumber from '#models/phone_number'
import Product from '#models/product'
import Sale from '#models/sale'
import { ApiClient } from '@japa/api-client'
import { DateTime } from 'luxon'

interface NewCustomer {
  fullName: string
  cpf: string
  phoneNumber: string
  address: {
    cep: string
    street: string
    streetNumber: number
    neighborhood: string
    city: string
    state: string
  }
}

interface NewProduct {
  title: string
  description: string
  price: number
  quantity: number
  image: string
}

interface NewSale {
  customerId: number
  productId: number
  quantity: number
  unitPrice: number
  totalPrice: number
  createdAt: DateTime
}

export const createUser = async (client: ApiClient) => {
  const userCreated = await client.post('/api/signup').json(newUser)
  return 'Bearer ' + userCreated.body().token
}

export const createCustomer = async (customer: NewCustomer) => {
  const createdCustomer = await Customer.create(customer)
  await PhoneNumber.create({ customerId: createdCustomer.id, phoneNumber: customer.phoneNumber })
  await Address.create({
    customerId: createdCustomer.id,
    ...customer.address,
  })
  return createdCustomer
}

export const createProduct = async (product: NewProduct) => await Product.create(product)

export const createSale = async (sale: NewSale) => await Sale.create(sale)

export const product1 = {
  title: 'Console Sony Playstation 5 Ps5 825gb Mídia Física',
  description: 'console PlayStation 5',
  price: 3999.95,
  quantity: 156,
  image: 'p0ucedy52gad1engrnh40xnf.jpg',
}

export const product2 = {
  title: 'Mouse Gamer Razer Deathadder Essential 6400dpi Cor Preto',
  description: 'produto é usado.\n',
  price: 200.95,
  quantity: 33,
  image: 'p0ucedy52gad1engrnh40xnf.jpg',
}

export const sale1 = {
  quantity: 1,
  unitPrice: 3999.95,
  totalPrice: 3999.95,
  createdAt: DateTime.fromISO('2024-05-15'),
}

export const sale2 = {
  quantity: 1,
  unitPrice: 200.95,
  totalPrice: 200.95,
  createdAt: DateTime.fromISO('2024-07-15'),
}

export const sale3 = {
  quantity: 2,
  unitPrice: 3999.95,
  totalPrice: 7999.9,
  createdAt: DateTime.fromISO('2023-05-15'),
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
    streetNumber: 405,
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
    streetNumber: 8098,
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
    streetNumber: 139,
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
    streetNumber: 33,
    neighborhood: 'Parque Verde',
    city: 'Belém',
    state: 'PA',
  },
}

export const customerToUpdate = {
  fullName: 'Camus Temis',
  cpf: '090.694.150-46',
  phoneNumber: '(14) 96432-1175',
  address: {
    cep: '55291-847',
    street: 'Avenida Francisco Lacerda',
    streetNumber: 67,
    neighborhood: 'Francisco Simão dos Santos Figueira',
    city: 'Garanhuns',
    state: 'PE',
  },
}
