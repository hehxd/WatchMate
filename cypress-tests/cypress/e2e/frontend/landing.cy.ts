describe('Frontend Landing Page Tests', () => {

    it('Should load the landing page', () => {
        cy.visit('/')
        cy.url().should('include', 'localhost:5173')
    })

    it('Should navigate to login page', () => {
        cy.visit('/')
        cy.contains('button', 'Access Platform').click()
        cy.url().should('include', 'view=login')
    })

    it('Should navigate to register page', () => {
        cy.visit('/')
        cy.contains('button', 'Create an Account').click()
        cy.url().should('include', 'view=register')
    })
})