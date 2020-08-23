/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('/sessions', 'SessionController.store').validator('Session')
Route.get('/session', 'SessionController.get')
Route.get('/sessions', 'SessionController.index')
Route.post('/forgot', 'ForgotPasswordController.store').validator('Forgot')
Route.post('/reset', 'ResetPasswordController.store').validator('Reset')
Route.post('/register', 'RegisterUserController.store').validator(
    'RegisterUser'
)

Route.group(() => {
    Route.get('/events', 'EventController.index')
    Route.get('/events/:id', 'EventController.show')
    Route.post('/events', 'EventController.store').validator('Event')
}).middleware('auth')

Route.group(() => {
    Route.get('/blog_posts', 'BlogPostController.index')
    Route.get('/blog_posts/pagination', 'BlogPostController.pagination')
    Route.get('/blog_posts/:id', 'BlogPostController.show')
    Route.delete('/blog_posts/:id', 'BlogPostController.delete')
    Route.post('/blog_posts', 'BlogPostController.store').validator('BlogPost')
    Route.put('/blog_posts/:id', 'BlogPostController.update').validator(
        'BlogPost'
    )
}).middleware('auth')
	
Route.get('/person/:id', 'PersonController.get')
Route.get('/user/:id', 'UserController.get')

Route.get('constants/:type', 'ConstantsController.store')
Route.get('/', () => 'Welcome to the GuildaTech')
