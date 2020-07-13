import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Panel from './components/Panel'
import Login from './components/Login'
import Home from './components/Home'

const App = () => {
  const [page, setPage] = useState("home")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [blogs, setBlogs] = useState([])

  const isAuthorized = user !== null;

  const logOut = () => {
    setUsername("")
    setPassword("")
    setUser(null)
    window.localStorage.removeItem("user")
    setIsLoading(false)
  }

  const notify = (isSuccessful, message) => {
    setNotification({isSuccessful, message})
    setTimeout(() => setNotification(null), 3500)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((first_blog, second_blog) => {
        if (first_blog.likes > second_blog.likes)
          return -1
        else if (first_blog.likes < second_blog.likes)
          return 1
        else
          return 0
      })
      setBlogs(blogs)
    })

    const savedUserRaw = window.localStorage.getItem("user")
    if (savedUserRaw) {
      setUser(JSON.parse(savedUserRaw))
    } else {
      // Switch to login form if not authorized
      setPage("login")
    }
  }, [])

  let pageContent;
  switch (page) {
  case "home":
    pageContent = <Home
      isAuthorized={isAuthorized}
      user={user}
      blogs={blogs}
      setBlogs={setBlogs}
      notify={notify}
    />
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
      notify={notify}
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
        notification={notification}
      />
      {pageContent}
    </div>
  )
}

export default App