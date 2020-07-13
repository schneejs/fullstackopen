import PropTypes from 'prop-types'
import React from 'react'
import { useSelector } from 'react-redux'

const Panel = props => {
    // const dispatch = useDispatch()
    const isLoading = useSelector(store => store.loading)
    const notification = useSelector(store => store.notification)

    return (
        <div>
            <button onClick={props.createPanelButtonHandler("home")}>Home</button>
            {
            props.isAuthorized
                ? <button onClick={props.logOut}>Log out</button>
                : <button onClick={props.createPanelButtonHandler("login")}>Log in</button>
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

Panel.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    createPanelButtonHandler: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
}

export default Panel