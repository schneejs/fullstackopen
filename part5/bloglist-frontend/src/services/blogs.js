import baseInstance from './baseInstance'

const getAll = () => {
  const request = baseInstance().get("/api/blogs")
  return request.then(response => response.data)
}

export default { getAll }