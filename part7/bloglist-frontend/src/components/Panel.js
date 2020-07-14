import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../reducers/loading'
import { setPage } from '../reducers/page'
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

    const createPanelButtonHandler = pageName => event => {
        event.preventDefault()
        dispatch(setPage(pageName))
    }

    return (
        <div>
            <button onClick={createPanelButtonHandler("home")}>Home</button>
            <button onClick={createPanelButtonHandler("users")}>Users</button>
            {
            isAuthorized
                ? <button onClick={logOut}>Log out</button>
                : <button onClick={createPanelButtonHandler("login")}>Log in</button>
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