const reducer = (state = '', action) => {
    if (!('type' in action))
        return state
    switch (action.type) {
        case 'SET_PAGE':
            return action.data.newPage
        default:
            return state
    }
}

export const setPage = (newPage) => async dispatch => {
    dispatch({
        type: 'SET_PAGE',
        data: { newPage }
    })
}

export default reducer