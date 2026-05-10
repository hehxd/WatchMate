import { AuthApi } from '../pageObjects/auth/auth.api'
import { WatchlistApi } from '../pageObjects/watchlist/watchlist.api'

describe('Create Watchlist', () => {
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

    it('Should create a new watchlist successfully', () => {
        WatchlistApi.createList(token, 'My Watchlist').then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
        })
    })
})