import {AuthApi} from '../../pageObjects/auth/auth.api'

describe('Login Tests', () => {
    const timestamp = Date.now().toString().slice(-6)
    const uniqueEmail = `testuser_${timestamp}@watchmate.com`
    const uniqueUsername = `user_${timestamp}`
    const password = 'test1234'

    before(() => {
        AuthApi.register(uniqueUsername, uniqueEmail, password)
    })

    it('Should login with valid credentials', () => {
        AuthApi.login(uniqueEmail, password)
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('token')
                expect(response.body).to.have.property('userId')
                expect(response.body.email).to.eq(uniqueEmail)
            })
    })
})