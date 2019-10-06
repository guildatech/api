/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')

class RegisterUserController {
    async store({ request, response }) {
        const data = request.only(['email', 'username', 'name', 'password'])
        const user = await User.create(data)
        if (user) return response.status(201).json({ message: 'user created' })
    }
}

module.exports = RegisterUserController
