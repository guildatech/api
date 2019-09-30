const { test , trait } = use('Test/Suite')('Session');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Factory = use('Factory');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const User = use('App/Models/User');

trait('Test/ApiClient');
trait('DatabaseTransactions')

test('it should return JWT when session created', async ({ assert ,client }) => {
    const sessionPayload = {
        email: 'joe@example.com',
        password: '123456'
    };

    const user = await Factory
        .model('App/Models/User')
        .create(sessionPayload);

    const response = await client
    .post('/sessions')
    .send(sessionPayload)
    .end();

    response.assertStatus(200);
    assert.exists(response.body.token);
});