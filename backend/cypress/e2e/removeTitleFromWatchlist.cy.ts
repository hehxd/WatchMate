import {AuthApi} from '../pageObjects/auth/auth.api'
import {TitlesApi} from '../pageObjects/titles/titles.api'
import {WatchlistApi} from '../pageObjects/watchlist/watchlist.api'

describe('Add Title To Watchlist', () => {
    const timestamp = Date.now().toString().slice(-6)
    const uniqueEmail = `testuser_${timestamp}@watchmate.com`
    const uniqueUsername = `user_${timestamp}`
    const password = 'test1234'
    let token: string
    let listId: number
    let titleId: number

    before(() => {
        AuthApi.register(uniqueUsername, uniqueEmail, password)
        cy.wait(500)
        AuthApi.getToken(uniqueEmail, password).then((t: string) => {
            token = t
            const uniqueTitle = {
                imdbId: `tt${Date.now().toString().slice(-7)}`,
                title: 'Breaking Bad',
                type: 'series',
                yearText: '2008-2013',
                plot: 'A chemistry teacher turns to manufacturing drugs.',
                posterUrl: 'https://example.com/breaking-bad.jpg',
                imdbRating: '9.5',
                totalSeasons: 5
            }
            TitlesApi.createTitle(token, uniqueTitle).then((titleResponse) => {
                titleId = titleResponse.body.id
                WatchlistApi.createList(token, 'My Watchlist').then((listResponse) => {
                    listId = listResponse.body.id
                })
            })
        })
    })

    it('Should add a title to watchlist successfully', () => {
        WatchlistApi.addTitleToList(token, listId, titleId).then((response) => {
            expect(response.status).to.eq(201)
        })
    })
})