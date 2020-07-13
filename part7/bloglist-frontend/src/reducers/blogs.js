const reducer = (state = [], action) => {
    if (!('type' in action))
        return state
    switch (action.type) {
        case 'INITIALIZE_BLOGS':
            const blogs = [...action.data]
            blogs.sort((first_blog, second_blog) => {
                if (first_blog.likes > second_blog.likes)
                    return -1
                else if (first_blog.likes < second_blog.likes)
                    return 1
                else
                    return 0
            })
            return blogs
        case 'RESET_BLOGS':
            return []
        default:
            return state
    }
}

export const initializeBlogs = blogs => async dispatch => {
    dispatch({
        type: 'INITIALIZE_BLOGS',
        data: blogs
    })
}

export default reducer