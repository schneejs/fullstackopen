import { gql, useLazyQuery } from '@apollo/client'
import React, { useCallback, useEffect, useState } from 'react'

export const ALL_BOOKS = gql`
query fetchAllBooks($author: String, $genre: String) {
  allBooks(author: $author, genre: $genre) {
    title
    published
    author {
      name
    }
    genres
  }
}
`

const Books = (props) => {
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')

  useEffect(() => {
    if (selectedGenre)
      getBooks({ variables: { genre: selectedGenre } })
    else
      getBooks()
  }, [selectedGenre, getBooks])

  useEffect(() => {
    if (result.data && books)
      setBooks(result.data.allBooks)
  }, [result, books])

  const genres = useCallback(() => {
    const genreSet = new Set()
    for (const book of books) {
      for (const genre of book.genres) {
        genreSet.add(genre)
      }
    }
    return Array.from(genreSet.values())
  }, [books])()

  if (result.loading)
    return <div>Loading...</div>

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <button onClick={() => setSelectedGenre('')}>all</button>
      {genres.map(genre => <button key={genre} onClick={() => setSelectedGenre(genre)}>
        {genre}
      </button>)}
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

export default Books