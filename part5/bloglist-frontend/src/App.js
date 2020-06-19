import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Panel from './components/Panel'
import Login from './components/Login'

const App = () => {
  const [page, setPage] = useState("home")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState([])

  const isAuthorized = user !== null;

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem("user")
    setIsLoading(false)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

    const savedUserRaw = window.localStorage.getItem("user")
    if (savedUserRaw) {
      setUser(JSON.parse(savedUserRaw))
    }
  }, [])

  let pageContent;
  switch (page) {
  case "home":
    pageContent = (
      <div>
        <h2>blogs</h2>
        {
          isAuthorized
            ? <p>Your nickname is {user.username}</p>
            : null
        }
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
    break
  case "login":
    pageContent = <Login
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      setIsLoading={setIsLoading}
      setUser={setUser}
      setPage={setPage}
    />
    break
  default:
    setPage("home")
    break
  }

  return (
    <div>
      <Panel
        createPanelButtonHandler={pageName => event => {
          event.preventDefault()
          setPage(pageName)}
        }
        isAuthorized={isAuthorized}
        logOut={logOut}
        isLoading={isLoading}
      />
      {pageContent}
    </div>
  )
}

export default App