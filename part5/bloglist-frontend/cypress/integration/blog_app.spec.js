/// <reference types="cypress" />

describe('Bloglist', () => {
    const user = {
        name: 'Juuser Name',
        username: 'juuser',
        password: 'name'
    }

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.visit('http://localhost:3000')
        cy.contains('Bloglist')
    })

    it('Login form is shown', function () {
        cy.visit('http://localhost:3000')
        cy.contains('log in').click()
        cy.contains('Login')
        cy.get('html').should('not.contain', 'Title')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('log in').click()
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#loginButton').click()

            cy.contains('Juuser Name logged in')
        })

        it('fails with wrong credentials', function () {
            cy.contains('log in').click()
            cy.get('#username').type("wrong")
            cy.get('#password').type("wrong")
            cy.get('#loginButton').click()

            cy.get('.error')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
            cy.get('html').should('not.contain', 'Juuser Name logged in')
        })
    })

    describe('Blog app', function () {
        // ...

        describe.only('When logged in', function () {
            const blog = {
                title: 'Testi',
                author: 'Esim Erkki',
                url: 'urli',
                likes: 0
            }

            const blogTwo = {
                title: 'Kaks',
                author: 'Kaks',
                url: 'Kaks',
                likes: 0
            }

            beforeEach(function () {
                cy.contains('log in').click()
                cy.get('#username').type(user.username)
                cy.get('#password').type(user.password)
                cy.get('#loginButton').click()
            })

            it('A blog can be created', function () {
                cy.contains('Add note').click()
                cy.get('#newTitle').type(blog.title)
                cy.get('#newAuthor').type(blog.author)
                cy.get('#newUrl').type(blog.url)
                cy.get('#create').click()
                cy.get('.titleauthor').should('contain', blog.title)
            })

            it('A blog can be liked', function () {
                cy.contains('Add note').click()
                cy.get('#newTitle').type(blog.title)
                cy.get('#newAuthor').type(blog.author)
                cy.get('#newUrl').type(blog.url)
                cy.get('#create').click()

                cy.contains('view').click()
                cy.get('#like').click()
                cy.get('#like').click()
                cy.get('.blog-likes').should('contain', blog.likes + 2)
            })

            it('A blog can be deleted', function () {
                cy.contains('Add note').click()
                cy.get('#newTitle').type(blog.title)
                cy.get('#newAuthor').type(blog.author)
                cy.get('#newUrl').type(blog.url)
                cy.get('#create').click()
                cy.get('.titleauthor').should('contain', blog.title)

                cy.contains('view').click()
                cy.contains('remove').click()
                cy.get('.titleauthor').should('not.contain', 'blog.title')
            })

            it('orders blogs by number of likes', function() {
                cy.contains('Add note').click()
                cy.get('#newTitle').type(blog.title)
                cy.get('#newAuthor').type(blog.author)
                cy.get('#newUrl').type(blog.url)
                cy.get('#create').click()

                cy.contains('Add note').click()
                cy.get('#newTitle').type(blogTwo.title)
                cy.get('#newAuthor').type(blogTwo.author)
                cy.get('#newUrl').type(blogTwo.url)
                cy.get('#create').click()

                cy.get(".blog-wrapper").contains("Testi").parent().as("TestiBlog");
                cy.get("@TestiBlog").contains("view").click();
                cy.get("@TestiBlog").get("#like").click().click()
          
            })
        })

    })

})