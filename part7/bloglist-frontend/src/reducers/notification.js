const reducer = (state = null, action) => {
    if (!('type' in action))
        return state
    switch (action.type) {
        case 'NOTIFY':
            return {
                isSuccessful: action.data.isSuccessful,
                message: action.data.message
            }
        case 'RESET_NOTIFICATION':
            return null
        default:
            return state
    }
}

export const notify = (isSuccessful, message) => async dispatch => {
    dispatch({
        type: 'NOTIFY',
        data: { isSuccessful, message }
    })
}

export const resetNotification = () => async dispatch => {
    dispatch({
        type: 'RESET_NOTIFICATION'
    })
}

export default reducer