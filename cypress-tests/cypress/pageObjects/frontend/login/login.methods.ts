import { LoginElements } from './login.elements'

export class LoginMethods {
    navigateToLogin() {
        cy.visit('/')
        cy.contains('button', 'Access Platform').click()
    }

    login(email: string, password: string) {
        LoginElements.elements.getEmailInput().type(email)
        LoginElements.elements.getPasswordInput().type(password)
        LoginElements.elements.getLoginButton().click()
    }

    verifyLoginSuccess() {
        cy.url().should('include', 'view=dashboard')
    }

    verifyLoginError() {
        LoginElements.elements.getErrorMessage()
            .should('be.visible')
            .and('contain', 'Invalid email or password')
    }
}