export class ReviewElements {
    static get elements() {
        return {
            getReviewTextarea: () => cy.get('textarea'),
            getSubmitButton: () => cy.contains('button', 'Publish Review'),
            getReviewText: () => cy.get('p.text-lg.text-white.italic'),
        }
    }
}
