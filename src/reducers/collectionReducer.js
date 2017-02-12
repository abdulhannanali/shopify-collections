/**
 * collectionReducer
 * collectionReducer supports the following action to do something
 * - FETCH_COLLECTIONS_STARTED
 * - FETCH_COLLECTIONS_FINISHED
 * - FETCH_COLlECTIONS_FAILED
 *
 * - `SET_ACTIVE_COLLECTION` (Sets the activeCollection)
 */

import { handleActions } from 'redux-actions'
import { List } from 'immutable'
import CollectionState from './state/CollectionState'
import {
  FETCH_COLLECTIONS_STARTED,
  FETCH_COLLECTIONS_FINISHED,
  FETCH_COLLECTIONS_FAILED,
  SET_ACTIVE_COLLECTION
} from '../constants'

const collectionReducer = handleActions({
  [FETCH_COLLECTIONS_STARTED]: (state) => state.set('loading', true),
  [FETCH_COLLECTIONS_FAILED]: (state) => state.set('failed', true),
  [FETCH_COLLECTIONS_FINISHED]: (state, { payload = {} }) => {
    return state.set('collections', List(payload.collections))
      .set('fetched', true)
      .set('loading', false)
      .set('failed', false)
  },
  [SET_ACTIVE_COLLECTION]: function (state, { type, payload }) {
    return state.set('activeCollection', payload.index)
  }
}, CollectionState)

export default collectionReducer
