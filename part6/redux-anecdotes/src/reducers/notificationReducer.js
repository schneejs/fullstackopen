const reducer = (state = null, action) => {
    switch (action.type) {
    case 'NOTIFY':
        return action.data
    case 'RESET_NOTIFICATION':
        return null
    default:
        return state
    }
}

export const notify = (message, is_successful, timeoutInSeconds) => async dispatch => {
    console.log({
        type: 'NOTIFY',
        is_successful, message
    })
    dispatch({
        type: 'NOTIFY',
        data: {
            message,
            is_successful
        }
    })
    setTimeout(() => {
        dispatch({
            type: 'RESET_NOTIFICATION'
        })
    }, timeoutInSeconds * 1000)
}

export default reducer