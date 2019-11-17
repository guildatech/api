/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PersonSchema extends Schema {
    up() {
        this.create('people', table => {
            table.increments('id')
            table.string('bio')
            table.string('homepage')
            table.string('contactEmail')
            table.timestamps()
        })
    }

    down() {
        this.drop('people')
    }
}

module.exports = PersonSchema
