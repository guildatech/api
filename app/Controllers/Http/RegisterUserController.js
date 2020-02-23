/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Person = use('App/Models/Person')

class RegisterUserController {
    async store({ request, response }) {
        const data = request.only(['email', 'username', 'name', 'password'])
        const person = await Person.create({
            contactEmail: request.input('email'),
            name: request.input('name')
        })
        data.person = person.id
        const user = await User.create(data)
        if (user) return response.status(201).json({ message: 'user created' })
    }
}

module.exports = RegisterUserController
