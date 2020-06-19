import React, { useState } from 'react'
import Blog from '../components/Blog'
import createBlog from '../services/createBlog'
import blogService from '../services/blogs'

const Home = props => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleCreateBlogButton = event => {
        event.preventDefault()
        createBlog(props.user, title, author, url)
            .then(response => {
                if (response.status !== 201)
                    alert("Error while uploading the blog")
                setTitle("")
                setAuthor("")
                setUrl("")

                blogService.getAll().then(blogs =>
                    props.setBlogs(blogs)
                )
            })
    }

    return (
        <div>
            <h2>blogs</h2>
            {
            props.isAuthorized
                ? <p>Your nickname is {props.user.username}</p>
                : null
            }
            {props.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
            <h2>create</h2>
            <label>
                title:
                <input value={title} onChange={event => setTitle(event.target.value)}></input>
            </label>
            <br />
            <label>
                author:
                <input value={author} onChange={event => setAuthor(event.target.value)}></input>
            </label>
            <br />
            <label>
                url:
                <input value={url} onChange={event => setUrl(event.target.value)}></input>
            </label>
            <br />
            <button onClick={handleCreateBlogButton}>Create blog</button>
        </div>
    )
}

export default Home