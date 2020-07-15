import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'reactstrap'

export default () => {
    const notification = useSelector(store => store.notification)
    const isLoading = useSelector(store => store.loading)

    return (
        <div>
            {isLoading ? <Alert color='secondary'>Loading...</Alert> : null}
            {
            notification !== null
                ? <Alert className="notification" color={notification.isSuccessful ? "success" : "danger"}>{notification.message}</Alert>
                : null
            }
        </div>
    )
}