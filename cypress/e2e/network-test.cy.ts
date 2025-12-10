describe('Network Interception', () => {
	it('Spies on a network request', () => {
		// 1. SETUP: Start listening BEFORE the action
		// We want to catch any GET request to a URL containing "/comments"
		// We give it the alias '@getComment'
		cy.intercept('GET', '**/comments/*').as('getComment')

		cy.visit('https://example.cypress.io/commands/network-requests')

		// 2. ACTION: Click the button that triggers the fetch
		cy.contains('Get Comment').click()

		// 3. WAIT: The "Hard" wait is replaced by this "Smart" wait
		// Cypress pauses here until the request finishes
		cy.wait('@getComment').then((interception) => {
			// 4. ASSERT: Inspect the "real" response from the server
			expect(interception.response.statusCode).to.equal(200)
			expect(interception.response.body).to.have.property('email')

			// Log it to console so you can see the object
			console.log('Intercepted Request:', interception)
		})

		// 5. UI ASSERTION: Verify the app updated
		cy.get('.network-comment').should('contain', 'laudantium enim quasi')
	})

	it('Stubs (Mocks) the response', () => {
		// 1. INTERCEPT & FAKE
		// Instead of just watching, we provide a 3rd argument: the fake response.
		cy.intercept('GET', '**/comments/*', {
			statusCode: 200,
			body: {
				postId: 1,
				id: 1,
				name: 'Cypress Master',
				email: 'hello@cypress.io',
				body: 'This comment was FAKED by Cypress! The real backend was never touched.'
			},
			delay: 500 // Optional: Simulate a slow network (0.5s)
		}).as('fakeComment')

		cy.visit('https://example.cypress.io/commands/network-requests')

		// 2. ACTION
		cy.contains('Get Comment').click()

		// 3. WAIT
		cy.wait('@fakeComment')

		// 4. ASSERT
		// The UI should show OUR fake text, not the real one from the server
		cy.get('.network-comment').should('contain', 'This comment was FAKED by Cypress!')
	})

	it('Handles a 500 Server Error gracefully', () => {
		// 1. STUB: Force the server to reply with a 500 status
		cy.intercept('GET', '**/comments/*', {
			statusCode: 500,
			body: { error: 'Internal Server Error' }, // Optional: simulate an error message
			delay: 500 // Optional: add delay to see the loader before the error
		}).as('serverError')

		cy.visit('https://example.cypress.io/commands/network-requests')

		// 2. ACTION
		cy.contains('Get Comment').click()

		// 3. WAIT & ASSERT
		cy.wait('@serverError')

		// 4. CHECK UI
		// In a real app, you would check for a toast notification or error banner
		// For this demo site, we check that the comment area is empty or shows the error
		cy.get('.network-comment').should('exist').and('be.empty')
	})

	it('Handles a Network Connection Failure', () => {
		// 1. STUB: Force a network layer failure
		// "forceNetworkError: true" simulates the browser failing to connect
		cy.intercept('GET', '**/comments/*', {
			forceNetworkError: true
		}).as('networkFail')

		cy.visit('https://example.cypress.io/commands/network-requests')

		cy.contains('Get Comment').click()

		cy.wait('@networkFail')

		// Note: On the demo page, this might just log an error to the console,
		// but in your React app, you should check for your "Offline" alert.
		// Example:
		// cy.contains('Please check your internet connection').should('be.visible');
	})
})
