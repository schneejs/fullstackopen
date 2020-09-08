import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import RecommendedBooks from './components/Recommended'

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
              <button onClick={() => setPage('recom')}>recommended</button>
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

      <RecommendedBooks
        show={page === 'recom'}
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