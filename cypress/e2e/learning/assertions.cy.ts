describe('Aserciones', () => {
	beforeEach(() => {
		cy.visit('/automation-practice-form')
	})

	afterEach(() => {
		cy.reload()
	})

	it('Aserciones', () => {
		cy.get('form').should('exist')

		cy.get('#firstName').should('be.visible').should('have.attr', 'placeholder', 'First Name')

		cy.get('#firstName').should('be.visible').and('have.attr', 'placeholder', 'First Name')
	})

	it('Aserciones 2', () => {
		cy.get('#firstName').then((element) => {
			expect(element).to.have.attr('placeholder', 'First Name')
		})
	})

	it('Aserciones 3', () => {
		cy.get('#firstName').then((element) => {
			assert.equal(element.attr('placeholder'), 'First Name')
		})
	})
})

describe('Assertions Practice', () => {
	it('Verifies login error messages', () => {
		cy.visit('https://the-internet.herokuapp.com/login')

		cy.url().should('include', '/login')
		cy.get('#username').should('have.value', '')

		cy.get('#username').type('wronguser')
		cy.get('#password').type('wrongpass')
		cy.get('.radius').click()

		cy.get('#flash')
			.should('be.visible')
			.and('have.class', 'error') // Check CSS class
			.and('contain', 'Your username is invalid!') // Check text

		// 4. Verify Style (CSS)
		// Example: verifying the background color of the error is red-ish
		// Note: Browsers return colors in RGB
		cy.get('#flash').should('have.css', 'background-color').and('include', 'rgb(198, 15, 19)') // Just an example color
	})
})
