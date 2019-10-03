/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Event = use('App/Models/Event')

class EventController {
    async store({ request, response }) {
        const data = request.only([
            'title',
            'description',
            'location_addres',
            'location_city_state',
            'start_time',
            'event_time',
            'created_by',
        ])

        const event = await Event.create(data)

        return response.status(201).json(event)
    }
}

module.exports = EventController
