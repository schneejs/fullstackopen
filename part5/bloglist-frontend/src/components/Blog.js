import React, { useState } from 'react'
import Togglable from './Togglable'
import likeBlog from '../services/likeBlog'

const Blog = ({ blog, user }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title}
      <Togglable isOpen={isOpen} toggle={toggle} name="Open">
        <p><a href={blog.url}>Website</a></p>
        <p>Author: {blog.author}</p>
        <p>Likes: {blog.likes + Number(liked)} <button type="button" onClick={like}>Like</button></p>
        <button type="button" onClick={() => setIsOpen(false)}>Close</button>
      </Togglable>
    </div>
  )
}

export default Blog
