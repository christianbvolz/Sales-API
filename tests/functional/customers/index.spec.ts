// import testUtils from '@adonisjs/core/services/test_utils'
// import { test } from '@japa/runner'

// const baseUrl = '/api/customers'

// const user = {
//   firstName: 'name',
//   lastName: 'last',
//   email: 'test@adonisjs.com',
//   password: 'superpassword',
// }

// test.group('Customers index', (group) => {
//   group.each.setup(() => testUtils.db().truncate())

//   test('should get a list of Customers', async ({ client, assert }) => {
//     const newUser = await client.post('/api/signup').json(user)
//     const customers = await client.get(baseUrl).header('Authorization', newUser.body().token)

//     customers.assertStatus(200)

//     assert.equal(customers.body().length, 2)
//   })
// })
