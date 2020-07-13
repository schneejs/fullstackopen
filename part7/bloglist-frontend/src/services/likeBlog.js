import baseInstance from './baseInstance'

const likeBlog = ({ token }, { id, likes }) => {
    return baseInstance(token)
        .patch("/api/blogs/" + id, {
            likes: likes + 1
        })
}

export default likeBlog