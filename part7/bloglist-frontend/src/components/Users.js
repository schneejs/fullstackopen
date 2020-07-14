import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
    const blogs = useSelector(store => store.blogs)
    const users = useSelector(store => store.cache.users)

    if (!users) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    const usersRows = users.map(user => {
        const blogsOfUser = blogs.filter(blog => blog.user !== null && blog.user.id === user.id)
        const blogsOfUserAmount = blogsOfUser.length
        return (
            <tr key={user.id}>
                <td><Link to={`/user/${user.id}`}>{user.username}</Link></td>
                <td>{blogsOfUserAmount}</td>
            </tr>
        )
    })
    
    return (
        <div>
            <table>
                <tr>
                    <td>Name</td>
                    <td>Blogs created</td>
                </tr>
                {usersRows}
            </table>
        </div>
    )
}

export default Users