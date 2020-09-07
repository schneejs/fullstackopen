import { gql, useMutation } from '@apollo/client'
import React, { createRef, useEffect } from 'react'

const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(
        username: $username,
        password: $password
    ) {
        value
    }
}
`

const Login = (props) => {
    const username = createRef()
    const password = createRef()

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            console.log(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (!result.data)
            return
        localStorage.setItem('token', result.data.login.value)
        props.setPage('authors')
    }, [result.data])

    if (!props.show)
        return null

    const handleSubmit = (event) => {
        event.preventDefault()
        login({
            variables: {
                username: username.current.value,
                password: password.current.value
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Username:
                    <input ref={username} />
                </div>
                <div>
                    Password:
                    <input type='password' ref={password} />
                </div>
                <button type='submit'>Sign in</button>
            </form>
        </div>
    )
}

export default Login