export class MovieDetailsElements {
    static get elements() {
        return {
            getMovieTitle: () => cy.get('h1.text-5xl'),
            getMovieType: () => cy.get('span.px-4.py-1\\.5'),
            getMovieYear: () => cy.get('span.text-gray-300.font-bold'),
            getMovieRating: () => cy.get('span.text-yellow-400'),
            getMoviePlot: () => cy.get('p.text-gray-400.text-lg'),
            getToWatchButton: () => cy.contains('button', 'To Watch Next'),
            getInWatchlistButton: () => cy.contains('button', 'In Watchlist'),
            getBackButton: () => cy.contains('button', 'Home'),
            getReviewTextarea: () => cy.get('textarea'),
            getPublishButton: () => cy.contains('button', 'Publish Review'),
            getWordCount: () => cy.get('span.text-sm.font-bold'),
            getFriendsReviews: () => cy.contains('h2', "Friends' Reviews"),
            getNoFriendsReviews: () => cy.contains('h3', "It's quiet here..."),
            getYourReview: () => cy.contains('h2', 'Your Review'),
        }
    }
}