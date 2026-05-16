import { DashboardElements } from './dashboard.elements'

export class DashboardMethods {
    verifyDashboardLoaded() {
        cy.url().should('include', 'view=dashboard')
    }

    openDropdown() {
        DashboardElements.elements.getUserAvatar().click()
    }

    logout() {
        this.openDropdown()
        cy.wait(500)
        DashboardElements.elements.getLogoutButton().should('be.visible').click()
    }

    navigateToProfile() {
        this.openDropdown()
        cy.wait(500)
        DashboardElements.elements.getProfileButton().should('be.visible').click()
    }

    verifyNavbarLinks() {
        DashboardElements.elements.getDashboardButton().should('be.visible')
        DashboardElements.elements.getFriendsReviewsButton().should('be.visible')
        DashboardElements.elements.getToWatchButton().should('be.visible')
    }
}