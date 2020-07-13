import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './components/Home'
import Login from './components/Login'
import Panel from './components/Panel'
import { setLoading } from './reducers/loading'
import { setPage } from './reducers/page'
import blogService from './services/blogs'

const App = () => {
  const page = useSelector(store => store.page)
  const isLoading = useSelector(store => store.loading)
  const dispatch = useDispatch()

  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([])

  const isAuthorized = user !== null;

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem("user")
    dispatch(setLoading(false))
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
    />
    break
  case "login":
    pageContent = <Login
      setUser={setUser}
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
      />
      {pageContent}
    </div>
  )
}

export default App