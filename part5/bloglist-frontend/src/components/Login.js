import React from 'react'
import PropTypes from 'prop-types'
import performLogin from '../services/login'

const Login = props => {
    const handleLoginButton = () => {
        props.setIsLoading(true)
        performLogin(props.username, props.password)
            .then(response => {
                if (response.status === 200) {
                    props.setUser(response.data)
                    props.setPage("home")
                    // Save the user's object
                    window.localStorage.setItem("user", JSON.stringify(response.data))
                    props.notify(true, "Successfully logged in")
                } else if (response.status === 401) {
                    props.notify(false, "Incorrect username or password")
                } else {
                    props.notify(false, "Unknown error")
                }
                props.setIsLoading(false)
            })
    }

    return (
        <div>
            <label>
                Username
                <input className="username" value={props.username} onChange={event => props.setUsername(event.target.value)}></input>
            </label>
            <br />
            <label>
                Password
                <input className="password" type="password" value={props.password} onChange={event => props.setPassword(event.target.value)}></input>
            </label>
            <button className="loginbutton" onClick={handleLoginButton}>Log in</button>
        </div>
    )
}

Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
    setUser: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired
}

export default Login