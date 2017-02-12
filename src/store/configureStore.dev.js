import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function () {
  const middlewares = [
    thunk.withExtraArgument({ yolo: 'klajda' }),
    createLogger()
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
