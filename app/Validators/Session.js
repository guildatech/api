class Session {
    get rules() {
        return {
            email: 'email|required',
            password: 'required',
        }
    }
}

module.exports = Session
