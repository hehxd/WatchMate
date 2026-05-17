import { ReviewElements } from './review.elements'

export class ReviewMethods {
    typeReview(text: string) {
        ReviewElements.elements.getReviewTextarea().clear().type(text)
    }

    clearReview() {
        ReviewElements.elements.getReviewTextarea().clear()
    }

    submitReview() {
        ReviewElements.elements.getSubmitButton().click()
    }

    verifySubmitButtonExists() {
        ReviewElements.elements.getSubmitButton().should('exist')
    }

    verifySubmitButtonDisabled() {
        ReviewElements.elements.getSubmitButton().should('be.disabled')
    }

    verifySubmitButtonEnabled() {
        ReviewElements.elements.getSubmitButton().should('not.be.disabled')
    }

    verifyTextareaIsEmpty() {
        ReviewElements.elements.getReviewTextarea().should('have.value', '')
    }

    verifyTextareaHasValue(text: string) {
        ReviewElements.elements.getReviewTextarea().should('have.value', text)
    }

    verifyReviewPublished(text: string) {
        ReviewElements.elements.getReviewText().should('contain', text)
    }
}