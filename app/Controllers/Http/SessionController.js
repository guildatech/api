
const User = use('App/Models/User')
const Token = use('App/Models/Token')
const Config = use('Config')
const { errors } = Config.get('errors')

class SessionController {
    async index() {
        const all = await Token.getAll()
        return all
    }

    async store({ request, auth }) {
        const { email, password } = request.only(['email', 'password'])

        const attempt = await auth.attempt(email, password)
        const found = await User.search({ email: email });
        const user = found && found.rows.length? found.rows[0]: null;
        Token.createAndSave({
            token: attempt.token,
            user_id: user.id,
            type: attempt.type
        });
        const { token } = attempt;
        return { token };
    }
    async get({ request, response }) {
        const authorization = request.headers().authorization;
        const token = authorization.replace("Bearer ", "");
        const found = await Token.query().where({token}).fetch()
        if (!found || !found.rows.length)  {
            response.status(406).json({
                error: errors.defaults.NOT_FOUND('user'),
            })
            return
        } 
        const user = await User.find(found.rows[0].user_id)
        response.send(user)
    }
}

module.exports = SessionController
