const BlogPost = use('App/Models/BlogPost')

class BlogPostController {
    async index() {
        const blogPosts = await BlogPost.getAll()
        return blogPosts
    }

    async pagination({ request }) {
        /*console.log(request._qs)     
        console.log(request._all)*/
        const blogPosts = await BlogPost.pagination(request._qs)
        return blogPosts
    }
    async show({ params }) {
        const blogPost = await BlogPost.getOneById(params.id)
        return blogPost
    }

    async store({ request, response, auth }) {
        const blogPostData = request.only(['post_title', 'post_body'])

        blogPostData.user_id = auth.user.id

        const newBlogPost = await BlogPost.createAndSave(blogPostData)

        if (newBlogPost) {
            return response.status(201).json(newBlogPost)
        }
    }

    async update({ params, request, response }) {
        const blogPostId = params.id

        const dataToUpdate = request.only(['post_title', 'post_body'])

        const blogPost = await BlogPost.updateById(blogPostId, dataToUpdate)

        response.status(200).json(blogPost)
    }
}

module.exports = BlogPostController
