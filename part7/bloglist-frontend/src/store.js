import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import pageReducer from './reducers/page'
import loadingReducer from './reducers/loading'
import notificationReducer from './reducers/notification'

const reducer = combineReducers({
    page: pageReducer,
    loading: loadingReducer,
    notification: notificationReducer
})

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)