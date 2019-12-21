const { test, trait } = use('Test/Suite')('Forgot Password')
const { subHours, format } = require('date-fns')

const Mail = use('Mail')
const Hash = use('Hash')
const Database = use('Database')

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should send a email with recover password instructions', async ({
    assert,
    client,
}) => {
    Mail.fake()
    const email = 'joe@example.com'

    const user = await Factory.model('App/Models/User').create({ email })

    await client
        .post('/forgot')
        .send({ email })
        .end()

    const token = await user.tokens().first()

    const recentEmail = Mail.pullRecent()

    assert.equal(recentEmail.message.to[0].address, email)

    assert.include(token.toJSON(), {
        type: 'forgotpassword',
    })

    Mail.restore()
})

test('it should be able to reset password of the account', async ({
    assert,
    client,
}) => {
    const email = 'joe@example.com'

    const user = await Factory.model('App/Models/User').create({ email })
    const userToken = await Factory.model('App/Models/Token').make()

    await user.tokens().save(userToken)

    const response = await client
        .post('/reset')
        .send({
            token: userToken.token,
            password: '123456',
            password_confirmation: '123456',
        })
        .end()

    response.assertStatus(201)

    await user.reload()
    const checkPassword = await Hash.verify('123456', user.password)

    assert.isTrue(checkPassword)
})

test('it cannot reset password after 2h of forgot password request', async ({
    client,
}) => {
    const email = 'joe@example.com'

    const user = await Factory.model('App/Models/User').create({ email })
    const userToken = await Factory.model('App/Models/Token').make()

    await user.tokens().save(userToken)

    const dateSub = format(subHours(new Date(), 2), 'yyyy-MM-dd HH:ii:ss')

    await Database.table('tokens')
        .where('token', userToken.token)
        .update('created_at', dateSub)

    await userToken.reload()

    const response = await client
        .post('/reset')
        .send({
            token: userToken.token,
            password: '123456',
            password_confirmation: '123456',
        })
        .end()

    response.assertStatus(400)
})
