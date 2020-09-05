const { ApolloServer, gql, UserInputError, ApolloError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./book')
const Author = require('./author')

const MONGODB_URI = 'mongodb+srv://fullstack:TU68qmUv7sDzr93@cluster0-udxk6.mongodb.net/booklist?retryWrites=true&w=majority'

const typeDefs = gql`
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
    }

    type Query {
        bookCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        authorCount: Int!
        allAuthors: [Author!]!
    }
`

const resolvers = {
    Mutation: {
        addBook: async (_, book) => {
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
        }
    },
    Query: {
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
    cors: true
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
