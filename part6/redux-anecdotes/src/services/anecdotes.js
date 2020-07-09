import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const result = await axios.get(baseUrl)
    return result.data
}

const postAnecdote = async (anecdote) => {
    const result = await axios.post(baseUrl, anecdote)
    return result.data
}

const patchAnecdote = async (id, anecdote) => {
    const result = await axios.patch(baseUrl + '/' + id, anecdote)
    return result.data
}

export default { getAll, postAnecdote, patchAnecdote }