import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

export default function () {
  const middlewares = [
    thunk.withExtraArgument({ yolo: 'klajda' }),
    createLogger
  ]

  const store = createStore(
        rootReducer,
        compose(
            applyMiddleware(...middlewares)
        )
    )

  store.asyncReducers = {}
  return store
}
