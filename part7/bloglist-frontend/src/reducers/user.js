const reducer = (state = null, action) => {
    if (!('type' in action))
        return state
    switch (action.type) {
        case 'INITIALIZE_USER':
            return {...action.data}
        case 'RESET_USER':
            return null
        default:
            return state
    }
}

export const initializeUser = user => async dispatch => {
    dispatch({
        type: 'INITIALIZE_USER',
        data: user
    })
}

export const resetUser = () => async dispatch => {
    dispatch({
        type: 'RESET_USER'
    })
}

export default reducer