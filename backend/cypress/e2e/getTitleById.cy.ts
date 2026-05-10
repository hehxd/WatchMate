import { AuthApi } from '../pageObjects/auth/auth.api'
import { TitlesApi } from '../pageObjects/titles/titles.api'

describe('Get Title By Id', () => {
    const timestamp = Date.now().toString().slice(-6)
    const uniqueEmail = `testuser_${timestamp}@watchmate.com`
    const uniqueUsername = `user_${timestamp}`
    const password = 'test1234'
    let token: string
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
            TitlesApi.createTitle(token, uniqueTitle).then((response) => {
                titleId = response.body.id
            })
        })
    })

    it('Should get a title by id successfully', () => {
        TitlesApi.getTitleById(token, titleId).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('id')
            expect(response.body.title).to.eq('Breaking Bad')
        })
    })
})