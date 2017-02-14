import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnly'

import rootReducer from '../reducers'

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
