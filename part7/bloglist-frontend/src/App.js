import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import Blog from './components/Blog'
import Home from './components/Home'
import Login from './components/Login'
import Notification from './components/Notification'
import Panel from './components/Panel'
import User from './components/User'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogs'
import { cacheData } from './reducers/cache'
import { initializeUser } from './reducers/user'
import blogService from './services/blogs'
import { getUsers } from './services/users'

const App = withRouter(({history}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    })

    getUsers().then(data => {
      dispatch(cacheData('users', data))
    })

    const savedUserRaw = window.localStorage.getItem("user")
    if (savedUserRaw) {
      dispatch(initializeUser(JSON.parse(savedUserRaw)))
    } else {
      // Switch to login form if not authorized
      history.replace('/login')
    }
  }, [dispatch, history])

  return (
    <div className='container'>
      <Panel />
      <Notification />
      <Switch location={history.location}>
        <Route path='/login' component={Login} />
        <Route path='/users/:id' component={User} />
        <Route path='/users' component={Users} />
        <Route path='/blogs/:id' component={Blog} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  )
})

export default App