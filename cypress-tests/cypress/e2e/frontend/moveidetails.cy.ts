import { LoginMethods } from '../../pageObjects/frontend/login/login.methods'
import { MovieDetailsMethods } from '../../pageObjects/frontend/moviedetails/moviedetails.methods'

describe('Movie Details Tests', () => {
    const email = 'alex@example.com'
    const password = 'Password123!'
    const login = new LoginMethods()
    const movieDetails = new MovieDetailsMethods()

    beforeEach(() => {
        login.navigateToLogin()
        login.login(email, password)
        cy.url().should('include', 'view=dashboard')
        cy.wait(1000)
        movieDetails.navigateToMovie('Interstellar')
    })

    it('Should load movie details page with all info', () => {
        movieDetails.verifyMovieDetailsLoaded()
        movieDetails.verifyMovieTitle('Interstellar')
        movieDetails.verifyMovieRating()
    })

    it('Should navigate back to dashboard', () => {
        movieDetails.goBackToDashboard()
    })
})