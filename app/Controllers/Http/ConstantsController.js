const Config = use('Config')
const { constants } = Config.get('constants')
const { errors } = Config.get('errors')
class ConstantsController {
    async store({ request, response }) {
        const query = request.params
        const { type } = query

        if (!type) {
            response.status(406).json({
                error: errors.constants.NOT_DEFINED,
            })
            return
        }
        if (!constants[type]) {
            response.status(406).json({
                error: errors.constants.NOT_FOUND,
            })
            return
        }
        response.send(constants[type || []])
    }
}

module.exports = ConstantsController
