export default (state = '', action) => {
    switch (action.type) {
    case 'SET_FILTER':
        return action.data.filter
    case 'RESET_FILTER':
        return ''
    default:
        return state
    }
}