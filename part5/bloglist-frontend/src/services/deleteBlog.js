import baseInstance from './baseInstance'

const deleteBlog = ({ token }, { id }) =>
    baseInstance(token).delete("/api/blogs/" + id)

export default deleteBlog