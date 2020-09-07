import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'

const App = () => {
  const token = localStorage.getItem('token')
  const [page, setPage] = useState('authors')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
            ? <span>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => localStorage.removeItem('token')}>log out</button>
            </span>
            : <button onClick={() => setPage('login')}>log in</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        {...{setPage}}
        show={page === 'login'}
      />

    </div>
  )
}

export default App