/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class RegisterUserController {
    async store({ request }) {
        const data = request.only(['email', 'username', 'name', 'password'])
        await User.create(data)
    }
}

module.exports = RegisterUserController
