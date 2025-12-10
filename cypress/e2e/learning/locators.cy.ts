describe('Locators', () => {
	it('Navigating to the form', () => {
		// Visit baseUrl from cypress.config.js
		cy.visit('/') // https://demoqa.com/

		// Click a the forms link to change URL
		cy.contains('Forms').click()

		// Verify we changed URL
		cy.location('pathname').should('eq', '/forms')
		cy.contains('Practice Form').click()
		cy.location('pathname').should('eq', '/automation-practice-form')

		// Ensure the form is visible
		cy.get('form#userForm').should('be.visible')

		// Fill out the form as a basic check
		cy.get('input#firstName').type('Brandon Argel')
		cy.get('input#lastName').type('Verdeja Domínguez')
		cy.get('input#userEmail').type('brandargel@gmail.com')

		// Chechbox
		cy.contains('Male').click()

		// Datepicker
		cy.get('input#dateOfBirthInput').click()
		cy.get('.react-datepicker__month-select').select('June')
		cy.get('.react-datepicker__year-select').select('2002')
		// Click the 27th day without the class react-datepicker__day--outside-month
		cy.get('.react-datepicker__day--027:not(.react-datepicker__day--outside-month)')
			.should('be.visible')
			.click()
	})
})

describe('Locator Strategies', () => {
	it('Finds elements using different methods', () => {
		// We use a site with challenging DOM
		cy.visit('https://the-internet.herokuapp.com/login')

		cy.get('input[name="username"]').type('tomsmith')

		cy.get('input[name="password"]').type('SuperSecretPassword!')

		cy.contains('button', 'Login').click()

		cy.get('#flash').should('contain', 'You logged into a secure area!')
	})
})
