import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import pageReducer from './reducers/page'

const reducer = combineReducers({
    page: pageReducer
})

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)