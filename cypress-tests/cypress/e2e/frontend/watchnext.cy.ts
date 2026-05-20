import { LoginMethods } from '../../pageObjects/frontend/login/login.methods'
import { WatchNextMethods } from '../../pageObjects/frontend/watchnext/watchnext.methods'

describe('Watch Next Tests', () => {
    const email = 'alex@example.com'
    const password = 'Password123!'
    const login = new LoginMethods()
    const watchNext = new WatchNextMethods()

    beforeEach(() => {
        cy.clearLocalStorage()
        login.navigateToLogin()
        login.login(email, password)
        cy.url().should('include', 'view=dashboard')
        cy.wait(1000)
    })

    it('Should add a movie to Watch Next and see it in the list', () => {
        cy.get('input[type="text"]').type('Interstellar')
        cy.wait(500)
        cy.get('.grid > div').first().click()
        cy.url().should('include', 'view=movie_details')
        cy.wait(1000)
        cy.contains('button', 'To Watch Next').click()
        cy.wait(500)
        watchNext.navigateToWatchNext()
        watchNext.verifyPageLoaded()
        watchNext.verifyListHasItems()
    })

    it('Should remove a movie from Watch Next list', () => {
        cy.get('input[type="text"]').type('Interstellar')
        cy.wait(500)
        cy.get('.grid > div').first().click()
        cy.url().should('include', 'view=movie_details')
        cy.wait(1000)
        cy.contains('button', 'To Watch Next').click()
        cy.wait(500)

        watchNext.navigateToWatchNext()
        watchNext.verifyPageLoaded()
        watchNext.verifyListHasItems()
        watchNext.removeFirstMovie()
        cy.wait(500)
        watchNext.verifyEmptyList()
    })
})