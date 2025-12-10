describe('Contact Form', () => {
	it('Fills the form using fixture data', () => {
		cy.visit('https://the-internet.herokuapp.com/forgot_password')

		// Load the file 'example_user.json'
		cy.fixture('example_user').then((user) => {
			// 'user' is now the JSON object we created above
			cy.get('#email').type(user.email)
		})

		cy.get('#form_submit').click()
	})
})
