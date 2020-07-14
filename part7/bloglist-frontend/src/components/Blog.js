import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeBlogs } from '../reducers/blogs'
import blogService from '../services/blogs'
import deleteBlog from '../services/deleteBlog'
import likeBlog from '../services/likeBlog'
import Togglable from './Togglable'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const blogs = useSelector(store => store.blogs)
  const id = useParams().id
  const [liked, setLiked] = useState(false)
  const blog = blogs.find(blog => blog.id === id)

  if (!blog)
    return (
      <div>Blog with ID {id} was not found</div>
    )

  const like = () => {
    if (!liked) {
      likeBlog(user, blog)
      setLiked(true)
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
    <div className="blog">
      <h3>{blog.title}</h3>
      <p><a href={blog.url}>Website</a></p>
      <p>Author: {blog.author}</p>
      <p>Likes: {blog.likes + Number(liked)} <button type="button" onClick={like}>Like</button></p>
      <p>
        {
          user !== null && blog.user !== null && blog.user.id === user.id
            ? <button type="button" onClick={delete_}>Delete</button>
            : null
        }
      </p>
    </div>
  )
}

Blog.propTypes = {
  likeCallback: PropTypes.func
}

export default Blog
