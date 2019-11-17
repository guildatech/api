/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Person = use('App/Models/Person')
const Config = use('Config')
const { errors } = Config.get('errors')

class UserController {
    async store({ params, request }) {
        const user = await Person.findOrFail(params.id)
        const data = request.only(['email', 'username', 'name', 'password'])
        user.merge(data)
        await user.save()

        return user
    }

    async get({ request, response }) {
        const { id } = request.params

        if (!id) {
            response.status(406).json({
                error: errors.defaults.NOT_DEFINED('id'),
            })
            return
        }

        const found = await User.find(id)
        if (!found) {
            response.status(406).json({
                error: errors.defaults.NOT_FOUND('user'),
            })
            return
        }
        response.send(found)
    }
}

module.exports = UserController
