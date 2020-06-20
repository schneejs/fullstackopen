import React from 'react'

const Panel = props => (
    <div>
        <button onClick={props.createPanelButtonHandler("home")}>Home</button>
        {
        props.isAuthorized
            ? <button onClick={props.logOut}>Log out</button>
            : <button onClick={props.createPanelButtonHandler("login")}>Log in</button>
        }
        {props.isLoading ? <span>Loading...</span> : null}
        {
            props.notification !== null
                ? <p style={{color: props.notification.isSuccessful ? "green" : "red"}}>{props.notification.message}</p>
                : null
        }
    </div>
)

export default Panel