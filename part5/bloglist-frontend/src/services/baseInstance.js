import axios from 'axios'

const baseURL = 'http://localhost:3001'

const baseInstance = token => axios.create({
    baseURL,
    headers: token ? { 'AUTHORIZATION': 'Bearer ' + token } : {}
})

export default baseInstance