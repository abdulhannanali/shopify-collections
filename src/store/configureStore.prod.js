import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnly'

export default function () {
  const middlewares = [
    thunk
  ]


  const composeEnhancers = composeWithDevTools({})
  const store = createStore(
        rootReducer,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    )

  store.asyncReducers = {}
  return store
}
