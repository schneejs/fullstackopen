import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)

    dispatch({
      type: 'INCREMENT_VOTES',
      data: { id }
    })
  }

  const addAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdoteText.value
    dispatch({
      type: 'ADD_ANECDOTE',
      data: { text: content }
    })
    event.target.anecdoteText.value = ''
  }

  const processedAnecdotes = [ ...anecdotes ]
  processedAnecdotes.sort(
    (first, second) => first.votes < second.votes
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      {processedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdoteText' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App