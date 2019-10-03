const Antl = use('Antl')

class Reset {
    get validateAll() {
        return true
    }

    get rules() {
        return {
            token: 'required',
            password: 'required|confirmed',
        }
    }

    get messages() {
        return Antl.list('validation')
    }
}

module.exports = Reset
