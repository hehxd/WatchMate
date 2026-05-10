import {AuthApi} from '../pageObjects/auth/auth.api'

describe('Register Tests', () => {
    const timestamp = Date.now().toString().slice(-6)
    const uniqueEmail = `testuser_${timestamp}@watchmate.com`
    const uniqueUsername = `user_${timestamp}`
    const password = 'test1234'

    it('Should register a new user successfully', () => {
        AuthApi.register(uniqueUsername, uniqueEmail, password)
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('token')
                expect(response.body).to.have.property('userId')
            })
    })
})