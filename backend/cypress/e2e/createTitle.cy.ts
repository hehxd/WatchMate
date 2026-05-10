import { AuthApi } from '../pageObjects/auth/auth.api'
import { TitlesApi } from '../pageObjects/titles/titles.api'

describe('Create Title', () => {
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

    it('Should create a new title successfully', () => {
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

        TitlesApi.createTitle(token, uniqueTitle).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('id')
            expect(response.body.title).to.eq(uniqueTitle.title)
        })
    })
})