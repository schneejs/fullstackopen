import React from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import { setLoading } from '../reducers/loading'
import { notify } from '../reducers/notification'
import { initializeUser } from '../reducers/user'
import performLogin from '../services/login'
import { useTextField } from './useField'

const Login = withRouter(({history}) => {
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
                dispatch(initializeUser(response.data))
                dispatch(notify(true, "Successfully logged in"))
                dispatch(setLoading(false))
                // Save the user's object
                window.localStorage.setItem("user", JSON.stringify(response.data))
                history.push('/')
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
            <Form>
                <FormGroup>
                    <Label for='username'>Username</Label>
                    <Input id='username' className="username" value={username} onChange={onUsernameChange} />
                </FormGroup>
                <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input id='password' className="password" type="password" value={password} onChange={onPasswordChange} />
                </FormGroup>
                <Button className="loginbutton" onClick={handleLoginButton}>Log in</Button>
            </Form>
        </div>
    )
})

export default Login