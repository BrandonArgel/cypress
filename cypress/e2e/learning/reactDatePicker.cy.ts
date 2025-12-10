describe('React Date Picker', () => {
	beforeEach(() => {
		cy.visit('https://mui.com/x/react-date-pickers/date-picker/')
	})

  it('should select a date from the date picker', () => {
    cy.get('.MuiPickersTextField-root').first().find('button').click()

		cy.get('MuiDateCalendar-root').should('be.visible').within(() => {
			cy.contains('15').click()
		})

		cy.get('.MuiPickersTextField-root').first().find('input').should('have.value', /\d{4}-\d{2}-15/)
  })
})
