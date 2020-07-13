import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Blog from '../components/Blog'
import Togglable from '../components/Togglable'
import { notify } from '../reducers/notification'
import blogService from '../services/blogs'
import createBlog from '../services/createBlog'

const CreateBlogForm = props => {
    const dispatch = useDispatch()

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
                    dispatch(notify(false, "Error while uploading the blog"))
                setTitle("")
                setAuthor("")
                setUrl("")
                setIsCreateBlogOpen(false)

                blogService.getAll().then(blogs =>
                    props.setBlogs(blogs)
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
                <input className="titleinput" value={title} onChange={event => setTitle(event.target.value)}></input>
            </label>
            <br />
            <label>
                author:
                <input className="authorinput" value={author} onChange={event => setAuthor(event.target.value)}></input>
            </label>
            <br />
            <label>
                url:
                <input className="urlinput" value={url} onChange={event => setUrl(event.target.value)}></input>
            </label>
            <br />
            <button className="createblog" onClick={handleCreateBlogButton}>Create blog</button>
            <button className="createblogcancel" onClick={() => setIsCreateBlogOpen(false)}>Cancel</button>
        </Togglable>
    )
}

CreateBlogForm.propTypes = {
    user: PropTypes.object,
    notify: PropTypes.func.isRequired,
    setBlogs: PropTypes.func.isRequired,
    createBlogCallback: PropTypes.func
}

const Home = props => (
    <div>
        <h2>blogs</h2>
        {
        props.isAuthorized
            ? <p>Your nickname is {props.user.username}</p>
            : null
        }
        <div id="blogs">
            {props.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={props.user} setBlogs={props.setBlogs} />
            )}
        </div>
        <CreateBlogForm
            user={props.user}
            setBlogs={props.setBlogs}
            createBlogCallback={props.createBlogCallback}
        />
    </div>
)

Home.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    blogs: PropTypes.array.isRequired,
    user: PropTypes.object,
    notify: PropTypes.func.isRequired,
    setBlogs: PropTypes.func.isRequired,
    createBlogCallback: PropTypes.func
}

export default Home