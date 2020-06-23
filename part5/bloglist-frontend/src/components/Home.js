import React, { useState } from 'react'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'
import createBlog from '../services/createBlog'
import blogService from '../services/blogs'

const CreateBlogForm = props => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false)
    const toggleIsCreateBlogOpen = () => setIsCreateBlogOpen(!isCreateBlogOpen)

    const handleCreateBlogButton = event => {
        event.preventDefault()
        createBlog(props.user, title, author, url)
            .then(response => {
                if (response.status !== 201)
                    props.notify(false, "Error while uploading the blog")
                setTitle("")
                setAuthor("")
                setUrl("")
                setIsCreateBlogOpen(false)

                blogService.getAll().then(blogs =>
                    props.setBlogs(blogs)
                )

                props.notify(true, "Blog successfully added")
            })
    }

    return (
        <Togglable name="Create blog" isOpen={isCreateBlogOpen} toggle={toggleIsCreateBlogOpen}>
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
            <button onClick={() => setIsCreateBlogOpen(false)}>Cancel</button>
        </Togglable>
    )
}

const Home = props => (
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
        <CreateBlogForm />
    </div>
)

export default Home