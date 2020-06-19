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
    </div>
)

export default Panel