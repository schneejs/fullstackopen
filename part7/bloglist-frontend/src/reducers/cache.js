const reducer = (state = {}, action) => {
    if (!('type' in action))
        return state
    switch (action.type) {
        case 'CACHE_DATA':
            const newState = {...state}
            newState[action.data.name] = action.data.data
            return newState
        case 'RESET_CACHE':
            return {}
        default:
            return state
    }
}

export const cacheData = (name, data) => async dispatch => {
    dispatch({
        type: 'CACHE_DATA',
        data: { name, data }
    })
}

export default reducer