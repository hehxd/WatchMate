import { LoginMethods } from '../../pageObjects/frontend/login/login.methods'
import { ReviewMethods } from '../../pageObjects/frontend/review/review.methods'

describe('Review Tests', () => {
    const email = 'alex@example.com'
    const password = 'Password123!'
    const login = new LoginMethods()
    const review = new ReviewMethods()

    beforeEach(() => {

        login.navigateToLogin()
        login.login(email, password)
        cy.url().should('include', 'view=dashboard')
        cy.wait(1000)


        cy.get('input[type="text"]').type('Game of Thrones')
        cy.wait(500)
        cy.get('.grid > div').first().click()
        cy.url().should('include', 'view=movie_details')
        cy.wait(1000)
    })

    it('Should show the review textarea and submit button', () => {
        review.verifySubmitButtonExists()
        review.verifyTextareaIsEmpty()
    })

    it('Should not submit an empty review - button should be disabled', () => {
        review.verifyTextareaIsEmpty()
        review.verifySubmitButtonDisabled()
    })

    it('Should enable submit button when textarea has content', () => {
        review.typeReview('This is an amazing show!')
        review.verifyTextareaHasValue('This is an amazing show!')
        review.verifySubmitButtonEnabled()
    })

    it('Should successfully publish a review with valid text', () => {
        const reviewText = 'This is an absolutely brilliant series!'
        review.typeReview(reviewText)
        review.submitReview()
        cy.wait(1000)
        review.verifyReviewPublished(reviewText)
    })
})
