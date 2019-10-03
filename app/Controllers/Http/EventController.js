/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Event = use('App/Models/Event')

class EventController {
    async index() {
        const events = Event.query()
            .with('user', builder => {
                builder.select(['id', 'name'])
            })
            .fetch()
        return events
    }

    async show({ params }) {
        const event = await Event.find(params.id)
        await event.load('user', builder => {
            builder.select(['id', 'name'])
        })
        return event
    }

    async store({ request, response }) {
        const data = request.only([
            'title',
            'description',
            'location_addres',
            'location_city_state',
            'start_time',
            'event_time',
            'user_id',
        ])

        const event = await Event.create(data)

        return response.status(201).json(event)
    }
}

module.exports = EventController
