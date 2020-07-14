import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogs'
import cacheReducer from './reducers/cache'
import loadingReducer from './reducers/loading'
import notificationReducer from './reducers/notification'
import userReducer from './reducers/user'

const reducer = combineReducers({
    loading: loadingReducer,
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
    cache: cacheReducer
})

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)