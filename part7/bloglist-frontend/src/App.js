import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './components/Home'
import Login from './components/Login'
import Panel from './components/Panel'
import { initializeBlogs } from './reducers/blogs'
import { setPage } from './reducers/page'
import { initializeUser } from './reducers/user'
import blogService from './services/blogs'

const App = () => {
  const page = useSelector(store => store.page)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    })

    const savedUserRaw = window.localStorage.getItem("user")
    if (savedUserRaw) {
      dispatch(initializeUser(JSON.parse(savedUserRaw)))
    } else {
      // Switch to login form if not authorized
      dispatch(setPage("login"))
    }
  }, [dispatch])

  let pageContent;
  switch (page) {
  case "home":
    pageContent = <Home />
    break
  case "login":
    pageContent = <Login />
    break
  default:
    dispatch(setPage("home"))
    break
  }

  return (
    <div>
      <Panel />
      {pageContent}
    </div>
  )
}

export default App