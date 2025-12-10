describe('Network Waiting', () => {
	it('Waits for the API to respond before checking UI', () => {
		// 1. SETUP: Tell Cypress to watch for this API call
		// We give it the nickname 'searchUsers'
		cy.intercept('GET', '/api/users?search=bob').as('searchUsers')

		cy.visit('/users')

		// 2. ACTION: This click triggers the API call above
		cy.get('#search-input').type('bob')
		cy.get('#search-btn').click()

		// 3. WAIT: Stop everything until the API responds (200 OK)
		// Cypress waits specifically for the response of THAT request
		cy.wait('@searchUsers')

		// 4. ASSERT: Now we are 100% sure the data is ready
		cy.get('.user-card').should('have.length', 1)
	})
})
