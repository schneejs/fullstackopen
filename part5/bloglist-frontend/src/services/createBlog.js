import baseInstance from './baseInstance'

const createBlog = ({ token }, title, author, url) => {
    return baseInstance(token).post("/api/blogs", { title, author, url })
}

export default createBlog