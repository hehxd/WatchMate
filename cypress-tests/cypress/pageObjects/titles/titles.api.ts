export class TitlesApi {
    static getAllTitles(token: string) {
        return cy.request({
            method: 'GET',
            url: '/api/titles',
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    static searchTitles(token: string, query: string) {
        return cy.request({
            method: 'GET',
            url: `/api/titles/search?query=${query}`,
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    static createTitle(token: string, titleData: object) {
        return cy.request({
            method: 'POST',
            url: '/api/titles',
            headers: { Authorization: `Bearer ${token}` },
            body: titleData,
            failOnStatusCode: false
        })
    }

    static getTitleById(token: string, id: number) {
        return cy.request({
            method: 'GET',
            url: `/api/titles/${id}`,
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}