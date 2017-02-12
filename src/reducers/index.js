import { combineReducers } from 'redux-immutable'

// All the reducers to be combined
import collection from './collectionReducer'

const rootReducer = combineReducers({
    collection
})

export default rootReducer