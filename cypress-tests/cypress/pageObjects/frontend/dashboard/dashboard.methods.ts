import { DashboardElements } from './dashboard.elements'

export class DashboardMethods {
    verifyDashboardLoaded() {
        cy.url().should('include', 'view=dashboard')
    }

    openDropdown() {
        DashboardElements.elements.getUserAvatar().click()
        cy.wait(300)
    }

    logout() {
        this.openDropdown()
        DashboardElements.elements.getLogoutButton().should('be.visible').click()
    }

    navigateToProfile() {
        this.openDropdown()
        DashboardElements.elements.getProfileButton().should('be.visible').click()
    }

    verifyNavbarLinks() {
        DashboardElements.elements.getDashboardButton().should('be.visible')
        DashboardElements.elements.getFriendsReviewsButton().should('be.visible')
        DashboardElements.elements.getWatchNextButton().should('be.visible')
    }
}