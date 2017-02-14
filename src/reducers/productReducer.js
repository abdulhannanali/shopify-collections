/**
 * productsReducer
 * productsReducer takes in actions about Products and
 * returns a new state to be used
 */
import ProductsState from './state/ProductsState'
import {
  FETCH_PRODUCTS_STARTED,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_FINISHED
} from '../constants'
import { handleActions } from 'redux-actions'
import { Map, List } from 'immutable'

const productsReducer = handleActions({
  [FETCH_PRODUCTS_STARTED]: (state, { payload }) => {
    const { collectionId } = payload
    return state.setIn('collections', collectionId, Map({ loading: true }))
  },
  [FETCH_PRODUCTS_FAILED]: (state, { payload }) => {
    const collectionId = { payload }
    return state.setIn(['collections', collectionId], Map({ failed: true }))
  },
  [FETCH_PRODUCTS_FINISHED]: (state, { payload }) => {
    const { collectionId, products } = payload

    return state
      .setIn(['collections', collectionId], Map({ products: List(products) }))
  }
}, ProductsState)

export default productsReducer
