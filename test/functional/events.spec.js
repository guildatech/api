const { test, trait } = use('Test/Suite')('Events')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should be able to create events', async ({ client }) => {
    const user = await Factory.model('App/Models/User').create()

    const response = await client
        .post('/events')
        .send({
            title: 'Este e um evento',
            description:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            location_addres: 'Rua João Benedito , 300',
            location_city_state: 'SP/SP',
            start_time: '2019-11-25',
            event_time: '12:30',
            created_by: user.id,
        })
        .end()

    response.assertStatus(201)
})
