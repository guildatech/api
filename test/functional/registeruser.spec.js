const { test, trait } = use('Test/Suite')('Register User')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should be able to register user to the database', async ({
    assert,
    client,
}) => {
    const sessionPayload = {
        username: 'JohnDoe',
        name: 'John Doe',
        email: 'joe@example.com',
        password: '123456',
    }

    await Factory.model('App/Models/User').create(sessionPayload)

    const response = await client
        .post('/register')
        .send(sessionPayload)
        .end()

    response.assertStatus(201)
    assert.exists(response)
})
