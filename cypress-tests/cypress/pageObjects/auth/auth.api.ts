export class AuthApi {
    static register(username: string, email: string, password: string) {
        return cy.request({
            method: 'POST',
            url: '/api/auth/register',
            body: { username, email, password },
            failOnStatusCode: false
        })
    }

    static login(email: string, password: string) {
        return cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: { email, password },
            failOnStatusCode: false
        })
    }

    static getToken(email: string, password: string) {
        return cy.request({
            method: 'POST',
            url: '/api/auth/login',
            body: { email, password },

        }).then((response) => response.body.token)
    }
}