import { AuthApi } from '../../pageObjects/auth/auth.api'
import { TitlesApi } from '../../pageObjects/titles/titles.api'

describe('Search Title', () => {
    const timestamp = Date.now().toString().slice(-6)
    const uniqueEmail = `testuser_${timestamp}@watchmate.com`
    const uniqueUsername = `user_${timestamp}`
    const password = 'test1234'
    let token: string

    before(() => {
        AuthApi.register(uniqueUsername, uniqueEmail, password).then(() => {
            AuthApi.getToken(uniqueEmail, password).then((t: string) => {
                token = t
            })
        })
    })

    it('Should search for a title successfully', () => {
        cy.fixture('titles.json').then((titlesData) => {
            TitlesApi.searchTitles(token, titlesData.searchQuery).then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.be.an('array')
            })
        })
    })
})