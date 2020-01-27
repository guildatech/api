const { test, trait } = use('Test/Suite')('Blog Posts')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

const BLOG_POSTS_ENDPOINT = '/blog_posts'

test('it should be able to create new blog posts', async ({
    assert,
    client,
}) => {
    const user = await Factory.model('App/Models/User').create()

    const blogPostData = {
        post_title: 'My awesome test post.',
        post_body: 'My awesome post content, lots of usefull stuff here.',
    }

    const response = await client
        .post(BLOG_POSTS_ENDPOINT)
        .loginVia(user, 'jwt')
        .send(blogPostData)
        .end()

    response.assertStatus(201)
    assert.exists(response.body)
    response.assertJSONSubset(blogPostData)
})

test('it should be able to list blog posts in the database', async ({
    assert,
    client,
}) => {
    const user = await Factory.model('App/Models/User').create()
    const blogPost = await Factory.model('App/Models/BlogPost').make({
        user_id: user.id,
    })

    await user.blogPosts().save(blogPost)

    const response = await client
        .get(BLOG_POSTS_ENDPOINT)
        .loginVia(user, 'jwt')
        .end()

    response.assertStatus(200)
    assert.equal(response.body[0].post_title, blogPost.post_title)
    assert.equal(response.body[0].post_body, blogPost.post_body)
    assert.equal(response.body[0].user.id, blogPost.user_id)
})

test('it should be able to show a single blog post', async ({
    assert,
    client,
}) => {
    const user = await Factory.model('App/Models/User').create()
    const blogPost = await Factory.model('App/Models/BlogPost').create({
        user_id: user.id,
    })

    await user.blogPosts().save(blogPost)

    const response = await client
        .get(`${BLOG_POSTS_ENDPOINT}/${blogPost.id}`)
        .loginVia(user, 'jwt')
        .end()

    response.assertStatus(200)
    assert.equal(response.body.post_title, blogPost.post_title)
    assert.equal(response.body.post_body, blogPost.post_body)
    assert.equal(response.body.user.id, blogPost.user_id)
})

test('it should be able to edit a blog post in the database', async ({
    client,
}) => {
    const user = await Factory.model('App/Models/User').create()
    const blogPost = await Factory.model('App/Models/BlogPost').create({
        user_id: user.id,
    })

    await user.blogPosts().save(blogPost)

    const updatedPost = {
        post_title: 'My updated post.',
        post_body: 'My updated text... Lot of words here....',
    }

    const response = await client
        .put(`${BLOG_POSTS_ENDPOINT}/${blogPost.id}`)
        .loginVia(user, 'jwt')
        .send(updatedPost)
        .end()

    await blogPost.reload()

    response.assertStatus(200)
    response.assertJSONSubset(updatedPost)
})
