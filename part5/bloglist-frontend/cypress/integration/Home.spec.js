describe('Main page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', () => {
        cy.get('input.username').should('exist')
        cy.get('input.password').should('exist')
        cy.get('button.loginbutton').should('exist')
    })
})