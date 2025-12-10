describe('Interactuando con drag and drops', () => {
	it('Interactuando con drag and drops', () => {
		cy.visit('https://demoqa.com/dragabble')
		cy.get('#dragBox')
			.trigger('mousedown', { which: 1, pageX: 0, pageY: 0 })
			.trigger('mousemove', { which: 1, pageX: 200, pageY: 200 })
			.trigger('mouseup')
	})
})
