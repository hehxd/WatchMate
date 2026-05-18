export class WatchNextElements {
    static get elements() {
        return {
            getPageTitle: () => cy.contains('h1', 'Watch Next'),
            getEmptyMessage: () => cy.contains('p', 'Your watchlist is empty.'),
            getMovieCards: () => cy.get('.grid > div'),
            getFirstMovieCard: () => cy.get('.grid > div').first(),
            getRemoveButton: () => cy.contains('button', 'Remove').first(),
            getFilterAll: () => cy.contains('button', 'ALL'),
            getFilterMovie: () => cy.contains('button', 'MOVIE'),
            getFilterSeries: () => cy.contains('button', 'SERIES'),
        }
    }
}