/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BlogPost extends Model {
    user() {
        return this.belongsTo('App/Models/User')
    }

    static createAndSave(blogPostData) {
        return BlogPost.create(blogPostData)
    }

    static getAll() {
        return BlogPost.query()
            .with('user', builder => {
                builder.select(['id', 'name'])
            })
            .fetch()
    }
    static pagination(params) {
        let pagination = { page: params.page || 1, size: params.size || 10 };
        delete params.page;
        delete params.size;
       

        return BlogPost.query().where(params).paginate(pagination.page , pagination.size)
    }


    static async getOneById(id) {
        const blogPost = await BlogPost.findOrFail(id)
        await blogPost.load('user', builder => {
            builder.select(['id', 'name'])
        })

        return blogPost
    }

    static async updateById(id, dataToUpdate) {
        const blogPost = await BlogPost.findOrFail(id)

        blogPost.merge(dataToUpdate)

        await blogPost.save()

        return blogPost
    }
}

module.exports = BlogPost
