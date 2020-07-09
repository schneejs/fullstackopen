import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { addAnecdote, initializeAnecdotes, voteAnecdote } from './reducers/anecdoteReducer'

const FilterForm = () => {
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handle = event => {
    const filterText = event.target.value

    dispatch({
      type: 'SET_FILTER',
      data: {
        filter: filterText
      }
    })
  }

  return (
    <div>
      <input onChange={handle} value={filter}></input>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)

    dispatch(voteAnecdote(id))

    dispatch({
      type: 'NOTIFY',
      data: {
        message: 'You have voted successfully',
        is_successful: true
      }
    })

    setTimeout(() => {
      dispatch({
        type: 'RESET_NOTIFICATION'
      })
    }, 5000)
  }

  const processedAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  processedAnecdotes.sort(
    (first, second) => first.votes < second.votes
  )

  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterForm />
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
    </div>
  )
}

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAnecdote = event => {
    event.preventDefault()
    dispatch(addAnecdote(event.target.anecdoteText.value))
    event.target.anecdoteText.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdote}>
        <div><input name='anecdoteText' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App