import "cypress-real-events";

describe('User Actions', () => {
	it('Handles hovers and keyboard events', () => {
		cy.visit('https://the-internet.herokuapp.com/hovers')

		// We trigger the mouse interaction on the Avatar image
		const avatar = cy.get('.figure').first()
		// Native Cypress hover does not work for this case, so we use realHover from cypress-real-events
		// avatar.trigger('mouseover')
		avatar.realHover()

		// Now the text is visible
		cy.contains('name: user1').should('be.visible')
		// cy.contains('View profile').click() // Now we can click!
		cy.contains('View profile').realClick() // cypress real events

		// SCENARIO 2: Keyboard
		cy.visit('https://the-internet.herokuapp.com/key_presses')

		// Type into the global body
		// cy.get('body').type('{enter}')
		cy.get('body').realType('test {enter}') // cypress real events
		cy.get('#result').should('contain', 'ENTER')

		// cy.get('body').type('{ctrl}')
		cy.get('body').focus().realPress('Control') // cypress real events
		cy.get('#result').should('contain', 'CONTROL')
	})
})
