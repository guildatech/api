const { test, trait } = use('Test/Suite')('Events')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

test('it should be able to create events', async ({ assert, client }) => {
    const user = await Factory.model('App/Models/User').create()

    const response = await client
        .post('/events')
        .loginVia(user, 'jwt')
        .send({
            title: 'Este e um evento',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            location_addres: 'Rua João Benedito , 300',
            location_city_state: 'SP/SP',
            start_time: '2019-11-25',
            event_time: '12:30',
            event_type: 'presentation',
            language: 'portuguese',
            dificult_level: '1',
            max_attendess: 32,
            is_public: 1,
            require_registration: 1,
            website: 'google.com',
            user_id: user.id,
        })
        .end()

    response.assertStatus(201)
    assert.exists(response.body)
})

test('it should be able to list events in the database', async ({
    assert,
    client,
}) => {
    const user = await Factory.model('App/Models/User').create()
    const event = await Factory.model('App/Models/Event').make({
        user_id: user.id,
    })

    await user.events().save(event)

    const response = await client
        .get('/events')
        .loginVia(user, 'jwt')
        .end()

    response.assertStatus(200)
    assert.equal(response.body[0].title, event.title)
    assert.equal(response.body[0].user.id, user.id)
})

test('it should be able to show single event', async ({ assert, client }) => {
    const user = await Factory.model('App/Models/User').create()
    const event = await Factory.model('App/Models/Event').create({
        user_id: user.id,
    })

    await user.events().save(event)

    const response = await client
        .get(`/events/${event.id}`)
        .loginVia(user, 'jwt')
        .end()

    response.assertStatus(200)
    assert.equal(response.body.title, event.title)
    assert.equal(response.body.user.id, user.id)
})
