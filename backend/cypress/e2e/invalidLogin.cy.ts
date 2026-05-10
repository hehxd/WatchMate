import { AuthApi } from '../pageObjects/auth/auth.api'

describe('Invalid Login Tests', () => {

    it('Should fail login with invalid credentials', () => {
        AuthApi.login('nonexistent@watchmate.com', 'wrongpassword')
            .then((response) => {
                expect(response.status).to.eq(400)
            })
    })
})