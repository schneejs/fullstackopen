import { gql, useMutation, useQuery } from '@apollo/client'
import React, { createRef } from 'react'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    bookCount
    born
  }
}
`

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: error => {
      console.log({error})
    },
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const author = createRef()
  const born = createRef()

  if (result.loading)
    return <div>Loading...</div>

  if (!props.show) {
    return null
  }
  
  const authors = result.data.allAuthors

  const handleSubmit = event => {
    event.preventDefault()

    if (!(author.current.value && born.current.value))
      return
    
    editAuthor({
      variables: {
        name: author.current.value,
        setBornTo: Number(born.current.value)
      }
    })
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <select ref={author}>
            <option value=''>Please, select an author</option>
          {
            authors.map(author => <option key={author.name} value={author.name}>{author.name}</option>)
          }
          </select>
        </label>
        <br />
        <label>
          Birth year:
          <input ref={born} />
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Authors
