/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Person = use('App/Models/Person')

class RegisterUserController {
    async store({ request }) {
        const data = request.only(['email', 'username', 'name', 'password'])
        const person = await Person.create({
            contactEmail: request.input('email'),
        })
        data.person = person.id
        await User.create(data)
    }
}

module.exports = RegisterUserController
