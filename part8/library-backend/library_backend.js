const { ApolloServer, gql, UserInputError, ApolloError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Book = require('./book')
const Author = require('./author')

const JWT_SECRET = 'sekret'
const MONGODB_URI = 'mongodb+srv://fullstack:TU68qmUv7sDzr93@cluster0-udxk6.mongodb.net/booklist?retryWrites=true&w=majority'

const typeDefs = gql`
    type User {
        username: String!
        favoriteGenre: String
        id: ID!
    }

    type Token {
        value: String!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type Mutation {
        addBook(
            title: String!,
            author: String!,
            published: Int!,
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!,
            setBornTo: Int
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }

    type Query {
        me: User
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        authorCount: Int!
        allAuthors: [Author!]!
    }
`

const resolvers = {
    Mutation: {
        addBook: async (_, book, { currentUser }) => {
            if (!currentUser)
                throw new AuthenticationError('You must be authorized')
            let author
            try {
                author = await Author.findOne({ name: book.author })
            } catch {
                author = null
            }
            // Automatically add authors if they don't exist
            if (!author) {
                author = new Author({ name: book.author })
                try {
                    author.save()
                } catch (error) {
                    if (error.errors['name'])
                        throw new UserInputError(error.errors['name'].message)
                    else
                        throw new ApolloError('Unknown error')
                }
            }

            const newBook = new Book({ ...book, author })
            try {
                newBook.save()
            } catch (error) {
                if (Object.keys(error.errors).length > 0) {
                    throw new UserInputError('Invalid fields', {
                        invalidFields: error.errors
                    })
                } else {
                    throw new ApolloError('Unknown error')
                }
            }
            return newBook
        },
        editAuthor: async (_, { name, setBornTo }) => {
            if (!currentUser)
                throw new AuthenticationError('You must be authorized')
            const author = await Author.findOne({ name })
            if (!author)
                return null
            if (setBornTo) {
                author.born = setBornTo
                try {
                    author.save()
                } catch (error) {
                    if (error.errors['born'])
                        throw new UserInputError(error.errors['born'].message)
                    else
                        throw new ApolloError('Unknown error')
                }
            }
            return author
        },
        createUser: async (_, { username, favoriteGenre }) => {
            return { username, favoriteGenre }
        },
        login: async (_, { username, password }) => {
            if (password !== 'secret')
                throw new UserInputError('Wrong password')
            return { value: jwt.sign({ username }, JWT_SECRET) }
        }
    },
    Query: {
        me: async (_, _2, context) => context.currentUser,
        bookCount: async () => await Book.count({}),
        allBooks: async (_, { author, genre }) => {
            const filter = {}
            if (author)
                filter.author = await Author.findOne({ name: author })
            if (genre)
                filter.genres = { $elemMatch: { $eq: genre } }
            return await Book.find(filter).populate('author')
        },
        authorCount: async () => await Author.count({}),
        allAuthors: async () => await Author.find({})
    },
    Author: {
        bookCount: async root => {
            const author = await Author.findOne({ name: root.name })
            return await Book.count({ author })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: true,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer')) {
            const token = auth.substring(7)
            const decodedToken = jwt.verify(token, JWT_SECRET)
            if (decodedToken)
                return { currentUser: { username: decodedToken.username } }
        }
    }
})

const main = async () => {
    process.stdout.write('Connecting to MongoDB Cloud... ')
    try {
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
        console.log('Done.')
    } catch (error) {
        console.log('Failed: ', error.message)
    }
    const { url } = await server.listen()
    console.log(`Server ready at ${url}`)
}

main()
