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

export default reducer