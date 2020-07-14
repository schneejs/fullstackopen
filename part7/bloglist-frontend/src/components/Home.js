import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../components/Togglable'
import { initializeBlogs } from '../reducers/blogs'
import { notify } from '../reducers/notification'
import blogService from '../services/blogs'
import createBlog from '../services/createBlog'
import { useTextField } from './useField'

const CreateBlogForm = props => {
    const dispatch = useDispatch()
    const user = useSelector(store => store.user)

    const [title, setTitle, onTitleChange] = useTextField('')
    const [author, setAuthor, onAuthorChange] = useTextField('')
    const [url, setUrl, onUrlChange] = useTextField('')

    const [isCreateBlogOpen, setIsCreateBlogOpen] = useState(false)
    const toggleIsCreateBlogOpen = () => setIsCreateBlogOpen(!isCreateBlogOpen)

    const handleCreateBlogButton = event => {
        event.preventDefault()
        createBlog(user, title, author, url)
            .then(response => {
                if (response.status !== 201)
                    dispatch(notify(false, "Error while uploading the blog"))
                setTitle('')
                setAuthor('')
                setUrl('')
                setIsCreateBlogOpen(false)

                blogService.getAll().then(blogs =>
                    dispatch(initializeBlogs(blogs))
                )

                dispatch(notify(true, "Blog successfully added"))
            })
        if (props.createBlogCallback)
            props.createBlogCallback(title, author, url)
    }

    return (
        <Togglable name="Create blog" isOpen={isCreateBlogOpen} toggle={toggleIsCreateBlogOpen}>
            <h2>create</h2>
            <label>
                title:
                <input className="titleinput" value={title} onChange={onTitleChange}></input>
            </label>
            <br />
            <label>
                author:
                <input className="authorinput" value={author} onChange={onAuthorChange}></input>
            </label>
            <br />
            <label>
                url:
                <input className="urlinput" value={url} onChange={onUrlChange}></input>
            </label>
            <br />
            <button className="createblog" onClick={handleCreateBlogButton}>Create blog</button>
            <button className="createblogcancel" onClick={() => setIsCreateBlogOpen(false)}>Cancel</button>
        </Togglable>
    )
}

CreateBlogForm.propTypes = {
    createBlogCallback: PropTypes.func
}

const Home = () => {
    const user = useSelector(store => store.user)
    const blogs = useSelector(store => store.blogs)

    const isAuthorized = user !== null

    const blogStyle = {
        paddingLeft: 3,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div>
            <h2>blogs</h2>
            {
            isAuthorized
                ? <p>Your nickname is {user.username}</p>
                : null
            }
            <div id="blogs">
                {
                    blogs.map(blog => (
                        <p key={blog.id}><Link style={blogStyle} to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
                    ))
                }
            </div>
            <CreateBlogForm />
        </div>
    )
}

export default Home