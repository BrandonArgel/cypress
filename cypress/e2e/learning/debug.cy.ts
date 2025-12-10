describe('Debugging Practice', () => {
	beforeEach(() => {
		cy.visit('https://the-internet.herokuapp.com/dynamic_loading/1')
		cy.reload(true)
	})

	it('Fails to find the right element', () => {
		cy.get('#start button').click()
		cy.get('#loading', { timeout: 10000 }).should('not.be.visible') // Wait for loader to vanish
		cy.get('#finish').should('contain.text', 'Hello World!')
	})
})
