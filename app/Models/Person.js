/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Person extends Model {
    static boot() {
        super.boot()
    }

    socialMedia() {
        return this.hasOne('App/Models/SocialMedia')
    }
}

module.exports = Person