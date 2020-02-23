/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', table => {
            table.increments('id')
            table.string('username').notNullable()
            .unique()
            table.string('name').notNullable()
            table
                .integer('person')
                .unsigned()
                .references('id')
                .inTable('person')
            table.string('email').notNullable()
            table.string('password').notNullable()
            table
                .boolean('is_admin')
                .defaultTo(false)
                .notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('users')
    }
}

module.exports = UserSchema
