import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setLoading } from '../reducers/loading'
import { notify } from '../reducers/notification'
import { setPage } from '../reducers/page'
import performLogin from '../services/login'
import { useTextField } from './useField'

const Login = props => {
    const dispatch = useDispatch()
    const [username, , onUsernameChange] = useTextField('')
    const [password, , onPasswordChange] = useTextField('')

    const handleLoginButton = () => {
        dispatch(setLoading(true))

        if (!(username && password)) {
            dispatch(notify(false, "Both username and password are required"))
            dispatch(setLoading(false))
            return
        }

        performLogin(username, password)
            .then(response => {
                props.setUser(response.data)
                dispatch(setPage("home"))
                // Save the user's object
                window.localStorage.setItem("user", JSON.stringify(response.data))
                dispatch(notify(true, "Successfully logged in"))
                dispatch(setLoading(false))
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(notify(false, "Incorrect username or password"))
                } else {
                    dispatch(notify(false, "Unknown error"))
                }
                dispatch(setLoading(false))
            })
    }

    return (
        <div>
            <label>
                Username
                <input className="username" value={username} onChange={onUsernameChange}></input>
            </label>
            <br />
            <label>
                Password
                <input className="password" type="password" value={password} onChange={onPasswordChange}></input>
            </label>
            <button className="loginbutton" onClick={handleLoginButton}>Log in</button>
        </div>
    )
}

Login.propTypes = {
    setIsLoading: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
}

export default Login