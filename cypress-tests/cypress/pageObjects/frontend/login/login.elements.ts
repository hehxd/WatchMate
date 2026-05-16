export class LoginElements {
    static get elements() {
        return {
            getEmailInput: () => cy.get('input[type="email"]'),
            getPasswordInput: () => cy.get('input[type="password"]'),
            getLoginButton: () => cy.get('button[type="submit"]'),
            getErrorMessage: () => cy.get('p.text-red-500'),
        }
    }
}