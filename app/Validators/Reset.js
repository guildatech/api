class Reset {
    get rules() {
        return {
            token: 'required',
            password: 'required|confirmed',
        }
    }
}

module.exports = Reset
