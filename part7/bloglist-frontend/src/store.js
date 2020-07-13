import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogs'
import loadingReducer from './reducers/loading'
import notificationReducer from './reducers/notification'
import pageReducer from './reducers/page'
import userReducer from './reducers/user'

const reducer = combineReducers({
    page: pageReducer,
    loading: loadingReducer,
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer
})

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)