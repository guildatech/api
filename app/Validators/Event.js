const Antl = use('Antl')

class Event {
    get validateAll() {
        return true
    }

    get rules() {
        return {
            title: 'required',
            description: 'required',
            location_addres: 'required',
            location_city_state: 'required',
            start_time: 'required',
            event_time: 'required',
            user_id: 'required|exists:users,id',
        }
    }

    get messages() {
        return Antl.list('validation')
    }
}

module.exports = Event
