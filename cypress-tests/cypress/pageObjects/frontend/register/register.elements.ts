export class RegisterElements {
    static get elements() {
        return {
            getUsernameInput: () => cy.get('input[type="text"]'),
            getEmailInput: () => cy.get('input[type="email"]'),
            getPasswordInput: () => cy.get('input[type="password"]').first(),
            getConfirmPasswordInput: () => cy.get('input[type="password"]').last(),
            getSubmitButton: () => cy.get('button[type="submit"]'),
            getErrorMessage: () => cy.get('p.text-red-500'),
            getSuccessMessage: () => cy.get('p.text-green-500'),
        }
    }
}