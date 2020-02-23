
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SocialMedia extends Model {
    static boot() {
        super.boot()
    }

    person() {
        return this.belongsTo('App/Models/Person')
    }
}

