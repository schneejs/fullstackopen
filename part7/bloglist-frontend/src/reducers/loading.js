const reducer = (state = false, action) => {
    if (!('type' in action))
        return state
    switch (action.type) {
        case 'SET_LOADING':
            return action.data.isLoading
        case 'TOGGLE_LOADING':
            return !state
        default:
            return state
    }
}

export const setLoading = value => async dispatch => {
    dispatch({
        type: 'SET_LOADING',
        data: { isLoading: value }
    })
}

export const toggleLoading = () => async dispatch => {
    dispatch({
        type: 'TOGGLE_LOADING'
    })
}

export default reducer