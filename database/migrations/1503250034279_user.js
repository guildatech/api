/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', table => {
            table.increments('id')
            table
                .string('username')
                .notNullable()
                .unique()
            table.string('name').notNullable()
            table
                .string('email')
                .notNullable()
                .unique()
            table.string('password').notNullable()
            table
                .integer('person')
                .unsigned()
                .references('id')
                .inTable('person')
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema
