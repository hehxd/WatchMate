export class DashboardElements {
    static get elements() {
        return {
            getDashboardButton: () => cy.contains('button', 'Home'),
            getFriendsReviewsButton: () => cy.contains('button', "Friends' Reviews"),
            getMyReviewsButton: () => cy.contains('button', 'My Reviews'),
            getWatchNextButton: () => cy.contains('button', 'Watch Next'),
            getWatchedButton: () => cy.contains('button', 'Watched'),
            getUserAvatar: () => cy.get('div.flex.items-center.space-x-2').first(),
            getLogoutButton: () => cy.contains('button', 'Secure Logout'),
            getProfileButton: () => cy.contains('button', 'My Profile'),
        }
    }
}