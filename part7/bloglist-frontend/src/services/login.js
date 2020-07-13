import baseInstance from './baseInstance'

const performLogin = (username, password) => {
    return baseInstance().post("/api/login", { username, password })
}

export default performLogin