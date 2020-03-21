/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Token extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }
    static createAndSave(data) {
        return Token.create(data)
    }
    static getAll() {
        return Token.query()
            .with('user', builder => {
                builder.select(['id', 'name'])
            })
            .fetch()
    }
}

module.exports = Token
