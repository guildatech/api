'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PeopleSchema extends Schema {
  up () {
    this.create('people', table => {
      table.increments('id')
      table.string('name')
      table.string('bio')
      table.string('homepage')
      table.string('contactEmail')
      table.timestamps()
  })
  }

  down () {
    this.drop('people')
  }
}

module.exports = PeopleSchema
