export class WatchlistApi {
    static createList(token: string, name: string) {
        return cy.request({
            method: 'POST',
            url: '/api/lists',
            headers: { Authorization: `Bearer ${token}` },
            body: { name }
        })
    }

    static getMyLists(token: string) {
        return cy.request({
            method: 'GET',
            url: '/api/lists/me',
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    static addTitleToList(token: string, listId: number, titleId: number) {
        return cy.request({
            method: 'POST',
            url: `/api/lists/${listId}/items`,
            headers: { Authorization: `Bearer ${token}` },
            body: { titleId },
            failOnStatusCode: false
        })
    }

    static removeTitleFromList(token: string, listId: number, titleId: number) {
        return cy.request({
            method: 'DELETE',
            url: `/api/lists/${listId}/items/${titleId}`,
            headers: { Authorization: `Bearer ${token}` },
            failOnStatusCode: false
        })
    }

    static getListItems(token: string, listId: number) {
        return cy.request({
            method: 'GET',
            url: `/api/lists/${listId}/items`,
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}