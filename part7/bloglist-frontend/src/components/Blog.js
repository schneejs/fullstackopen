import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogs'
import blogService from '../services/blogs'
import deleteBlog from '../services/deleteBlog'
import likeBlog from '../services/likeBlog'
import Togglable from './Togglable'

const Blog = ({ blog, likeCallback }) => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)

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
    if (!liked) {
      likeBlog(user, blog)
      setLiked(true)
      if (likeCallback)
        likeCallback()
    }
  }

  const delete_ = async () => {
    if (!window.confirm(`Do you really want to delete ${blog.title}?`))
      return
    await deleteBlog(user, blog)
    const blogs = await blogService.getAll()
    dispatch(initializeBlogs(blogs))
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
            user !== null && blog.user !== null && blog.user.id === user.id
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
  likeCallback: PropTypes.func
}

export default Blog
