/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
    up() {
        this.create('users', table => {
            table.increments()
            table.string('username').notNullable()
            table.string('name').notNullable()
            table.string('bio')
            table.string('github')
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
