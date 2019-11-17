class RegisterUser {
    get rules() {
        return {
            username: 'required|unique:users',
            name: 'required',
            email: 'email|required|unique:users',
            password: 'required',
        }
    }
}

module.exports = RegisterUser
