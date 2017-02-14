import { combineReducers } from 'redux-immutable'

// All the reducers to be combined
import collection from './collectionReducer'
import product from './productReducer'

const rootReducer = combineReducers({
    collection,
    product
})

export default rootReducer