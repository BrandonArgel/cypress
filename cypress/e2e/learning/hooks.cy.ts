describe('Shopping Cart Tests', () => {
	// 1. RUNS ONCE BEFORE ALL
	before(() => {
		cy.log('🚀 Starting the test suite...')
		// In a real app, you might create a user in the DB here
	})

	// 2. RUNS BEFORE EVERY TEST (The Reset)
	beforeEach(() => {
		// We visit the page before EVERY test to ensure a clean state
		cy.visit('https://www.saucedemo.com/')

		// We can also login before every test
		cy.get('[data-test="username"]').type('standard_user')
		cy.get('[data-test="password"]').type('secret_sauce')
		cy.get('[data-test="login-button"]').click()
	})

	// 3. RUNS AFTER EVERY TEST
	afterEach(() => {
		cy.log('✅ Test finished. Cleaning up...')
		// Example: Clear local storage explicitly (optional)
		cy.clearLocalStorage()
	})

	// --- THE TESTS ---

	it('Test 1: Adds an item to the cart', () => {
		cy.log('Executing Test 1')
		cy.contains('Sauce Labs Backpack').click()
		cy.get('.shopping_cart_badge').should('have.text', '1')
	})

	it('Test 2: Verifies the menu opens', () => {
		cy.log('Executing Test 2')
		// Notice we are already logged in thanks to beforeEach!
		cy.get('#react-burger-menu-btn').click()
		cy.get('.bm-item-list').should('be.visible')
	})
})
