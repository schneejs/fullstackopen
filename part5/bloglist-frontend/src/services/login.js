import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/login'

const performLogin = (username, password) => {
    return axios.post(baseUrl, {username, password})
}

export default performLogin