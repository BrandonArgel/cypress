describe('User Dashboard', () => {
	beforeEach(() => {
		cy.login('admin@example.com', '123456')
	})

	it('Shows the welcome message', () => {
		cy.contains('Welcome back, Admin').should('be.visible')
	})
})
