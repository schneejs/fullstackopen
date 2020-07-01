describe('Working with login', () => {
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
})

describe('Working with blogs', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/testing/adduser', {
            username: "maria",
            password: "sekret"
        })
        cy.visit('http://localhost:3000')

        // All tests will be performed while logged in
        cy.get('input.username').type('maria')
        cy.get('input.password').type('sekret')
        cy.get('button.loginbutton').click()
    })

    it('Creating blogs works', () => {
        cy.contains('Create blog').click()
        cy.get('input.titleinput').type('Engineering airplanes')
        cy.get('input.authorinput').type('Maria')
        cy.get('input.urlinput').type('http://example.com')
        cy.get('button.createblog').click()

        cy.contains('Engineering airplanes').should('exist')
        cy.contains('Open').should('exist')
    })

    it('Liking blogs works', () => {
        cy.contains('Create blog').click()
        cy.get('input.titleinput').type('Engineering airplanes')
        cy.get('input.authorinput').type('Maria')
        cy.get('input.urlinput').type('http://example.com')
        cy.get('button.createblog').click()

        cy.contains('Open').click()
        cy.contains('Likes: 0').should('exist')
        cy.contains('Like').click()
        cy.contains('Likes: 1').should('exist')
    })

    it('Deleting blogs works', () => {
        cy.contains('Create blog').click()
        cy.get('input.titleinput').type('Engineering airplanes')
        cy.get('input.authorinput').type('Maria')
        cy.get('input.urlinput').type('http://example.com')
        cy.get('button.createblog').click()

        cy.contains('Open').click()
        cy.contains('Delete').click()
        cy.contains('Engineering airplanes').should('not.exist')
    })

    it('Other users cannot delete my blog', () => {
        cy.request('POST', 'http://localhost:3001/api/testing/adduser', {
            username: "john",
            password: "sekret"
        })

        cy.contains('Create blog').click()
        cy.get('input.titleinput').type('Engineering airplanes')
        cy.get('input.authorinput').type('Maria')
        cy.get('input.urlinput').type('http://example.com')
        cy.get('button.createblog').click()
        cy.get('.notification').should('contain', 'added')

        cy.contains('Log out').click()
        cy.contains('Log in').click()
        cy.get('input.username').type('john')
        cy.get('input.password').type('sekret')
        cy.get('button.loginbutton').click()

        cy.contains('Open').click()
        cy.contains('Delete').should('not.exist')
    })

    it('Blogs are ordered', () => {
        cy.request('POST', 'http://localhost:3001/api/testing/addblog', {
            title: 'Blog A',
            author: 'Maria',
            url: 'example.com',
            likes: 1
        })
        cy.request('POST', 'http://localhost:3001/api/testing/addblog', {
            title: 'Blog B',
            author: 'Maria',
            url: 'example.com',
            likes: 2
        })

        cy.visit('http://localhost:3000')

        const names = [ 'Blog B', 'Blog A' ]

        cy.get('#blogs > div.blog').should($divs => {
            expect($divs).to.have.length(names.length)
            expect($divs.eq(0)).to.contain(names[0])
            expect($divs.eq(1)).to.contain(names[1])
        })
    })
})