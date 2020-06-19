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
                } else if (response.status === 401) {
                    alert("Incorrect username or password")
                } else {
                    alert("Unknown error")
                }
                props.setIsLoading(false)

                // Save the user's object
                window.localStorage.setItem("user", JSON.stringify(response.data))
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