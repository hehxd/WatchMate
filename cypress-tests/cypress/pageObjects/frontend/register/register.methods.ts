import { RegisterElements } from './register.elements'

export class RegisterMethods {
    navigateToRegister() {
        cy.visit('/')
        cy.contains('button', 'Create an Account').click()
    }

    register(username: string, email: string, password: string, confirmPassword: string) {
        RegisterElements.elements.getUsernameInput().type(username)
        RegisterElements.elements.getEmailInput().type(email)
        RegisterElements.elements.getPasswordInput().type(password)
        RegisterElements.elements.getConfirmPasswordInput().type(confirmPassword)
        RegisterElements.elements.getSubmitButton().click()
    }

    verifyRegisterSuccess() {
        RegisterElements.elements.getSuccessMessage()
            .should('be.visible')
            .and('contain', 'Account created successfully')
    }

    verifyRegisterError() {
        RegisterElements.elements.getErrorMessage()
            .should('be.visible')
    }

    verifyPasswordMismatchError() {
        RegisterElements.elements.getErrorMessage()
            .should('be.visible')
            .and('contain', 'passwords do not match')
    }
}