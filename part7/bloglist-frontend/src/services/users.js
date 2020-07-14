import baseInstance from './baseInstance'

export const getUsers = () => {
    const response = baseInstance().get('/api/users')
    return response.then(response => response.data)
}