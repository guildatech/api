/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
    return {
        username: faker.username(),
        name: faker.name(),
        email: faker.email(),
        password: faker.string(),
        ...data,
    }
})

Factory.blueprint('App/Models/Token', (faker, i, data = {}) => {
    return {
        type: data.type || 'refreshToken',
        token: faker.string({ lenght: 20 }),
        ...data,
    }
})

Factory.blueprint('App/Models/Event', (faker, i, data = {}) => {
    return {
        title: faker.sentence({ words: 5 }),
        description: faker.paragraph(),
        location_addres: faker.string({ lenght: 15 }),
        location_city_state: faker.string({ lenght: 15 }),
        start_time: faker.date({ string: true, american: false }),
        event_time: faker.hour(),
        event_type: faker.string({ lenght: 7 }),
        language: faker.string({ lenght: 7 }),
        dificult_level: faker.hour(),
        max_attendess: faker.hour(),
        is_public: faker.bool(),
        require_registration: faker.bool(),
        website: faker.string({ lenght: 7 }),
        ...data,
    }
})
