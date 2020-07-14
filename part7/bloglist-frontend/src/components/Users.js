import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getUsers } from '../services/users'

const Users = () => {
    const blogs = useSelector(store => store.blogs)
    const [users, setUsers] = useState(null)

    useEffect(() => {
        getUsers()
            .then(data => {
                setUsers(data)
            })
    })

    if (users === null) {
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
                <td>{user.username}</td>
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