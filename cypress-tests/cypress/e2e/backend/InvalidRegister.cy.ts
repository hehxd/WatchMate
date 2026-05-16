import { AuthApi } from '../../pageObjects/auth/auth.api'

describe('Register Duplicate Username', () => {
    const timestamp = Date.now().toString().slice(-6)
    const uniqueEmail1 = `testuser1_${timestamp}@watchmate.com`
    const uniqueEmail2 = `testuser2_${timestamp}@watchmate.com`
    const username = `user_${timestamp}`
    const password = 'test1234'

    before(() => {
        AuthApi.register(username, uniqueEmail1, password)
    })

    it('Should fail registration when username is already in use', () => {
        AuthApi.register(username, uniqueEmail2, password)
            .then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body).to.have.property('error')
                expect(response.body.error).to.eq('Username already in use')
            })
    })
})