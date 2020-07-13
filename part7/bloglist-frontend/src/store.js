import { applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import pageReducer from './reducers/page'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    page: pageReducer
})

export default createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)