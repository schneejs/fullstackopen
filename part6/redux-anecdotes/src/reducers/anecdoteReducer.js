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

export default reducer