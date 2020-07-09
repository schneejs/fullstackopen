import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  const newState = [ ...state ]

  switch (action.type) {
  case 'INIT_ANECDOTES':
    return action.data
  case 'INCREMENT_VOTES':
    newState.filter(anecdote => anecdote.id === action.data.id)[0].votes++
    return newState
  case 'ADD_ANECDOTE':
    newState.push(action.data)
    return newState
  case 'UPD_ANECDOTE':
    const newAnecdote = action.data
    return newState.map(anecdote => anecdote.id === newAnecdote.id ? newAnecdote : anecdote)
  default:
    return state
  }
}

export const initializeAnecdotes = () => async dispatch => {
  const data = await anecdoteService.getAll()
  dispatch({
    type: 'INIT_ANECDOTES',
    data
  })
}

export const addAnecdote = content => async dispatch => {
  const anecdote = await anecdoteService.postAnecdote({
    content,
    votes: 0
  })
  dispatch({
    type: 'ADD_ANECDOTE',
    data: anecdote
  })
}

export const voteAnecdote = id => async dispatch => {
  const anecdotes = await anecdoteService.getAll()
  const votes = anecdotes.filter(anecdote => anecdote.id === id)[0].votes + 1
  const anecdote = await anecdoteService.patchAnecdote(id, { votes })
  dispatch({
    type: 'UPD_ANECDOTE',
    data: anecdote
  })
}

export default reducer