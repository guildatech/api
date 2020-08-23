/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BlogPostSchema extends Schema {
    up() {
        this.create('blog_posts', table => {
            table.increments()
            table
                .integer('user_id')
                .unsigned()
                .references('id')
                .inTable('users')
            table.string('post_title').notNullable()
            table.text('post_body').notNullable()
            table.timestamps()
        })
    }

    down() {
        this.drop('blog_posts')
    }
}

module.exports = BlogPostSchema
