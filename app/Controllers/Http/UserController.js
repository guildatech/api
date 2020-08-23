/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Person = use('App/Models/Person')
const Token = use('App/Models/Token')
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

    async getByToken({ request, response }) {
        const { token } = request.params
        const found = await Token.query().where({ token })
        if (!found) {
            response.status(406).json({
                error: errors.defaults.NOT_FOUND('user'),
            })
            return
        }
        const user = await User.find(found.user_id)
        response.send(user)
    }
}

module.exports = UserController
