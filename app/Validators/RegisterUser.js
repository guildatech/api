const Antl = use('Antl')

class RegisterUser {
    get validateAll() {
        return true
    }

    get rules() {
        return {
            username: 'required',
            name: 'required',
            email: 'email|required',
            password: 'required',
        }
    }

    get messages() {
        return Antl.list('validation')
    }
}

module.exports = RegisterUser
