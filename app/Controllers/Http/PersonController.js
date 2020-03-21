/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Person = use('App/Models/Person')
const Config = use('Config')
const { errors } = Config.get('errors')

class PersonController {
    async store({ request }) {
        const data = request.only(['bio', 'homepage', 'contactEmail'])
        await Person.create(data)
    }

    async update({ params, request }) {
        const person = await Person.findOrFail(params.id)
        const data = request.only(['bio', 'homepage', 'contactEmail'])

        person.merge(data)
        await person.save()

        return person
    }

    async get({ request, response }) {
        const { id } = request.params

        if (!id) {
            response.status(406).json({
                error: errors.defaults.NOT_DEFINED('id'),
            })
            return
        }

        const found = await Person.find(id)
        if (!found) {
            response.status(406).json({
                error: errors.defaults.NOT_FOUND('person'),
            })
            return
        }
        response.send(found)
    }
}

module.exports = PersonController