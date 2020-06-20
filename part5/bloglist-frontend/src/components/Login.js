import React from 'react'
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
                <input value={props.username} onChange={event => props.setUsername(event.target.value)}></input>
            </label>
            <br />
            <label>
                Password
                <input type="password" value={props.password} onChange={event => props.setPassword(event.target.value)}></input>
            </label>
            <button onClick={handleLoginButton}>Log in</button>
        </div>
    )
}

export default Login