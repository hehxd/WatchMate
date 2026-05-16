const { defineConfig } = require('cypress')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        specPattern: 'cypress/e2e/frontend/**/*.cy.ts',
        setupNodeEvents(on, config) {},
        viewportWidth: 1280,
        viewportHeight: 800,
    },
})