describe('Mastering Navigation', () => {
	it('Navigates, goes back, and reloads', () => {
		// 1. Visit a real page
		cy.visit('https://the-internet.herokuapp.com/')

		// 2. Click a link to change URL
		cy.contains('Checkboxes').click()

		// 3. Verify we changed URL
		cy.location('pathname').should('eq', '/checkboxes')

		// 4. Go BACK to home
		cy.go('back')
		cy.location('pathname').should('eq', '/') // Verify we are back

		// 5. Go FORWARD again
		cy.go('forward')
		cy.url().should('include', 'checkboxes')

		// 6. Reload the page
		cy.reload()
		// Ensure page is still active (Cypress waits automatically)
		cy.get('h3').should('contain', 'Checkboxes')
	})
})
