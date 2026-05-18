import { WatchNextElements } from './watchnext.elements'

export class WatchNextMethods {
    navigateToWatchNext() {
        cy.contains('button', 'Watch Next').click()
        cy.wait(500)
    }

    verifyPageLoaded() {
        WatchNextElements.elements.getPageTitle().should('be.visible')
    }

    verifyEmptyList() {
        WatchNextElements.elements.getEmptyMessage().should('be.visible')
    }

    verifyListHasItems() {
        WatchNextElements.elements.getMovieCards()
            .should('have.length.greaterThan', 0)
    }

    removeFirstMovie() {
        WatchNextElements.elements.getRemoveButton().click()
    }

    clickFirstMovie() {
        WatchNextElements.elements.getFirstMovieCard().click()
    }

    filterByAll() {
        WatchNextElements.elements.getFilterAll().click()
    }

    filterByMovie() {
        WatchNextElements.elements.getFilterMovie().click()
    }

    filterBySeries() {
        WatchNextElements.elements.getFilterSeries().click()
    }
}