export class DashboardElements {
    static get elements() {
        return {
            getNavbar: () => cy.get('nav.w-full'),
            getDashboardButton: () => cy.contains('button', 'Dashboard'),
            getFriendsReviewsButton: () => cy.contains('button', "Friends' Reviews"),
            getToWatchButton: () => cy.contains('button', 'To Watch'),
            getUserAvatar: () => cy.get('div.w-10.h-10.rounded-full.bg-red-900'),
            getDropdownMenu: () => cy.get('div.absolute.right-0'),
            getLogoutButton: () => cy.contains('button', 'Secure Logout'),
            getProfileButton: () => cy.contains('button', 'My Profile'),
        }
    }
}