import { LoginMethods } from '../../pageObjects/frontend/login/login.methods'
import { DashboardMethods } from '../../pageObjects/frontend/dashboard/dashboard.methods'

describe('Frontend Login Tests', () => {
    const timestamp = Date.now().toString().slice(-6)
    const email = `testuser_${timestamp}@watchmate.com`
    const username = `user_${timestamp}`
    const password = 'test1234'
    const login = new LoginMethods()
    const dashboard = new DashboardMethods()

    before(() => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8080/api/auth/register',
            body: { username, email, password },
            failOnStatusCode: false
        })
    })

    it('Should login successfully and land on dashboard', () => {
        login.navigateToLogin()
        login.login(email, password)
        cy.url().should('include', 'view=dashboard')
    })

    it('Should show error with invalid credentials', () => {
        login.navigateToLogin()
        login.login('wrong@email.com', 'wrongpassword')
        login.verifyLoginError()
    })

    it('Should logout successfully', () => {
        login.navigateToLogin()
        login.login(email, password)
        cy.url().should('include', 'view=dashboard')
        cy.wait(500)
        dashboard.logout()
        cy.url().should('include', 'view=landing')
    })
})