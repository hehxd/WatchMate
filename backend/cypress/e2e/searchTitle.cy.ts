import {AuthApi} from '../pageObjects/auth/auth.api'
import {TitlesApi} from '../pageObjects/titles/titles.api'

describe('Search Title', () => {
    const timestamp = Date.now().toString().slice(-6)
    const uniqueEmail = `testuser_${timestamp}@watchmate.com`
    const uniqueUsername = `user_${timestamp}`
    const password = 'test1234'
    const titlesData = require('../fixtures/titles.json')
    let token: string

    before(() => {
        AuthApi.register(uniqueUsername, uniqueEmail, password)
        cy.wait(500)
        AuthApi.getToken(uniqueEmail, password).then((t: string) => {
            token = t
        })
    })

    it('Should search for a title successfully', () => {
        TitlesApi.searchTitles(token, titlesData.searchQuery).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })
})