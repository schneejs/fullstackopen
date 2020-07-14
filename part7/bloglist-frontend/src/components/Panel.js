import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setLoading } from '../reducers/loading'
import { resetUser } from '../reducers/user'

const Panel = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector(store => store.loading)
    const notification = useSelector(store => store.notification)
    const user = useSelector(store => store.user)

    const isAuthorized = user !== null

    const logOut = () => {
        dispatch(resetUser())
        window.localStorage.removeItem("user")
        dispatch(setLoading(false))
    }

    return (
        <div>
            <Link to='/'>Home</Link>
            <Link to='/users'>Users</Link>
            {
            isAuthorized
                ? <button onClick={logOut}>Log out</button>
                : <Link to='/login'>Log in</Link>
            }
            {isLoading ? <span>Loading...</span> : null}
            {
                notification !== null
                    ? <p className="notification" style={{color: notification.isSuccessful ? "green" : "red"}}>{notification.message}</p>
                    : null
            }
        </div>
    )
}

export default Panel