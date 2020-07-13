import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './components/Home'
import Login from './components/Login'
import Panel from './components/Panel'
import { setPage } from './reducers/page'
import blogService from './services/blogs'

const App = () => {
  const page = useSelector(store => store.page)
  const dispatch = useDispatch()

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
      dispatch(setPage("login"))
    }
  }, [dispatch])

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
      notify={notify}
    />
    break
  default:
    dispatch(setPage("home"))
    break
  }

  return (
    <div>
      <Panel
        createPanelButtonHandler={pageName => event => {
          event.preventDefault()
          dispatch(setPage(pageName))
        }}
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