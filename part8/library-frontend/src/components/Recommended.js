import { useLazyQuery } from '@apollo/client'
import React, { createRef, useEffect, useState } from 'react'
import { ALL_BOOKS } from './Books'

const RecommendedBooks = (props) => {
    const [getBooks, result] = useLazyQuery(ALL_BOOKS)
    const [books, setBooks] = useState([])
    const [favoriteGenre, setFavoriteGenre] = useState('')
    const favoriteGenreRef = createRef()

    useEffect(() => {
        if (!favoriteGenre)
            return
        getBooks({ variables: { genre: favoriteGenre } })
    }, [favoriteGenre, getBooks])

    useEffect(() => {
        if (result.data && books)
            setBooks(result.data.allBooks)
    }, [result, books])

    if (result.loading)
        return <div>Loading...</div>

    if (!props.show) {
        return null
    }

    if (!favoriteGenre) {
        const handleSubmit = event => {
            event.preventDefault()
            setFavoriteGenre(favoriteGenreRef.current.value)
        }

        return (
            <div>
                <h2>set up your recommendations</h2>
                <div>
                    Favorite genre:
                <input ref={favoriteGenreRef} />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        )
    }

    return (
        <div>
            <h2>recommended books</h2>
            <p>Our recommendations based on your favorite genre <strong>{favoriteGenre}</strong></p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            author
                    </th>
                        <th>
                            published
                    </th>
                    </tr>
                    {books.map(a =>
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default RecommendedBooks