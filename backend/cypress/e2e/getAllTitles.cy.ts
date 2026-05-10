import { AuthApi } from '../pageObjects/auth/auth.api'
import { TitlesApi } from '../pageObjects/titles/titles.api'

describe('Get All Titles', () => {
    const timestamp = Date.now().toString().slice(-6)
    const uniqueEmail = `testuser_${timestamp}@watchmate.com`
    const uniqueUsername = `user_${timestamp}`
    const password = 'test1234'
    let token: string

    before(() => {
        AuthApi.register(uniqueUsername, uniqueEmail, password)
        cy.wait(500)
        AuthApi.getToken(uniqueEmail, password).then((t: string) => {
            token = t
        })
    })

    it('Should get all titles successfully', () => {
        TitlesApi.getAllTitles(token).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })
})