/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EventsSchema extends Schema {
    up() {
        this.create('events', table => {
            table.increments()
            table
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
                .onDelete('SET NULL')
                .onUpdate('CASCADE')
            table.string('title').notNullable()
            table.text('description').notNullable()
            table.string('location_addres').notNullable()
            table.string('location_city_state').notNullable()
            table.date('start_time').notNullable()
            table.time('event_time', { precision: 4 }).notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('events')
    }
}

module.exports = EventsSchema
