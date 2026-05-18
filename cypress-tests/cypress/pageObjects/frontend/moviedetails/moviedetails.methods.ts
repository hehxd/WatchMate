import { MovieDetailsElements } from './moviedetails.elements'

export class MovieDetailsMethods {
    navigateToMovie(movieName: string) {
        cy.get('input[type="text"]').type(movieName)
        cy.wait(500)
        cy.get('.grid > div').first().click()
        cy.url().should('include', 'view=movie_details')
        cy.wait(1000)
    }

    verifyMovieDetailsLoaded() {
        MovieDetailsElements.elements.getMovieTitle().should('be.visible')
        MovieDetailsElements.elements.getMoviePlot().should('be.visible')
    }

    verifyMovieTitle(title: string) {
        MovieDetailsElements.elements.getMovieTitle().should('contain', title)
    }

    verifyMovieType(type: string) {
        MovieDetailsElements.elements.getMovieType().should('contain', type)
    }

    verifyMovieRating() {
        MovieDetailsElements.elements.getMovieRating().should('be.visible')
    }

    clickToWatchNext() {
        MovieDetailsElements.elements.getToWatchButton().click()
    }

    verifyAddedToWatchlist() {
        MovieDetailsElements.elements.getInWatchlistButton().should('be.visible')
    }

    goBackToDashboard() {
        MovieDetailsElements.elements.getBackButton().click()
        cy.url().should('include', 'view=dashboard')
    }

    typeReview(text: string) {
        MovieDetailsElements.elements.getReviewTextarea().clear().type(text)
    }

    verifySubmitDisabled() {
        MovieDetailsElements.elements.getPublishButton().should('be.disabled')
    }

    verifySubmitEnabled() {
        MovieDetailsElements.elements.getPublishButton().should('not.be.disabled')
    }

    submitReview() {
        MovieDetailsElements.elements.getPublishButton().click()
    }

    verifyWordCount(count: string) {
        MovieDetailsElements.elements.getWordCount().should('contain', count)
    }

    verifyFriendsReviewsSection() {
        MovieDetailsElements.elements.getFriendsReviews().should('be.visible')
    }

    verifyNoFriendsReviews() {
        MovieDetailsElements.elements.getNoFriendsReviews().should('be.visible')
    }

    verifyYourReviewVisible() {
        MovieDetailsElements.elements.getYourReview().should('be.visible')
    }
}