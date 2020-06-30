describe('Main page', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/testing/adduser', {
            username: "maria",
            password: "sekret"
        })
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown by default', () => {
        cy.get('input.username').should('exist')
        cy.get('input.password').should('exist')
        cy.get('button.loginbutton').should('exist')
    })

    it('Login form, lacking password', () => {
        cy.get('input.username').type('maria')
        cy.get('button.loginbutton').click()
        cy.get('.notification').should('contain', 'Both username and password are required')
    })

    it('Login form, lacking username', () => {
        cy.get('input.password').type('sekret')
        cy.get('button.loginbutton').click()
        cy.get('.notification').should('contain', 'Both username and password are required')
    })

    it('Login form, incorrect data', () => {
        cy.get('input.username').type('dieserbenutzernameexistiereleidernicht')
        cy.get('input.password').type('dieseskennwortexistiertnicht')
        cy.get('button.loginbutton').click()
        cy.get('.notification')
            .should('contain', 'Incorrect')
            // Color test
            .should('have.css', 'color')
            .and("contain", "rgb(255, 0, 0)")
    })

    it('Login form, successfully logged in', () => {
        cy.get('input.username').type('maria')
        cy.get('input.password').type('sekret')
        cy.get('button.loginbutton').click()
        cy.get('.notification').should('contain', 'uccessfully')
        cy.contains('Log out').should('exist')
    })

    it('Creating blogs words', () => {
        cy.get('input.username').type('maria')
        cy.get('input.password').type('sekret')
        cy.get('button.loginbutton').click()

        cy.contains('Create blog').click()
        cy.get('input.titleinput').type('Engineering airplanes')
        cy.get('input.authorinput').type('Maria')
        cy.get('input.urlinput').type('http://example.com')
        cy.get('button.createblog').click()

        cy.contains('Engineering airplanes').should('exist')
        cy.contains('Open').should('exist')
    })
})