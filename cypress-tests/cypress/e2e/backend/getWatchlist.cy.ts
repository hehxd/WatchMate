import { AuthApi } from '../../pageObjects/auth/auth.api'
import { WatchlistApi } from '../../pageObjects/watchlist/watchlist.api'

describe('Get My Watchlists', () => {
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
            WatchlistApi.createList(token, 'My Watchlist')
        })
    })

    it('Should get my watchlists successfully', () => {
        WatchlistApi.getMyLists(token).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.be.an('array')
        })
    })
})