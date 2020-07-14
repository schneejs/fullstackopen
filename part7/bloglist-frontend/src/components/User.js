import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export default () => {
    const id = useParams().id
    const users = useSelector(store => store.cache.users)
    const blogs = useSelector(store => store.blogs)
    if (!users)
        return (
            <div>
                <p>Loading...</p>
            </div>
        )

    const user = users.find(user => user.id === id)
    if (!user)
        return (
            <div>
                <p>Unfortunately, user with ID {id} was not found</p>
            </div>
        )

    const blogsOfUser = blogs.filter(blog => blog.user !== null && blog.user.id === id)
    return (
        <div>
            <h3>{user.username}</h3>
            {blogsOfUser.length > 0 ? <p>Blogs of the user</p> : null}
            <ul>
            {
                blogsOfUser.length > 0
                    ? blogsOfUser.map(blog =>
                        <li key={blog.id}>{blog.title}</li>
                    )
                    : null
            }
            </ul>
        </div>
    )
}