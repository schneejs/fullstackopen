import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'
import likeBlog from '../services/likeBlog'
import deleteBlog from '../services/deleteBlog'
import blogService from '../services/blogs'

const Blog = ({ blog, user, setBlogs }) => {
  const blogStyle = {
    paddingLeft: 3,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const [liked, setLiked] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  const like = () => {
    likeBlog(user, blog)
    setLiked(true)
  }

  const delete_ = async () => {
    if (!window.confirm(`Do you really want to delete ${blog.title}?`))
      return
    await deleteBlog(user, blog)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title}
      <Togglable isOpen={isOpen} toggle={toggle} name="Open">
        <p><a href={blog.url}>Website</a></p>
        <p>Author: {blog.author}</p>
        <p>Likes: {blog.likes + Number(liked)} <button type="button" onClick={like}>Like</button></p>
        <p>
          {
            blog.user.id === user.id
              ? <button type="button" onClick={delete_}>Delete</button>
              : null
          }
          <button type="button" onClick={() => setIsOpen(false)}>Close</button>
        </p>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired
}

export default Blog
