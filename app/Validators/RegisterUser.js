class RegisterUser {
    get rules() {
        return {
            username: 'required',
            name: 'required',
            email: 'email|required',
            password: 'required',
        }
    }
}

module.exports = RegisterUser
