import {
  FETCH_COLLECTIONS_STARTED,
  FETCH_COLLECTIONS_FINISHED,
  FETCH_COLLECTIONS_FAILED,
  SET_ACTIVE_COLLECTION,
  COLLECTIONS
} from '../constants'
import shopClient from './shopClient'

import _get from 'lodash.get'
import _isEmpty from 'lodash.isempty'

/**
 * fetchAllCollections
 */
const fetchAllCollections = async () => {
  const collections = await shopClient.fetchAllCollections()
  return collections
    .map((collection) => _get(collection, 'attrs'))
    .filter(({ collection_id }) => COLLECTIONS.indexOf(collection_id) !== -1)
}

/**
 * fetchCollections
 * function used to fetchCollections from `shopClient`
 */
export function fetchCollections () {
    return async (dispatch) => {
      try {
        dispatch({ type: FETCH_COLLECTIONS_STARTED })
        const collections = await fetchAllCollections()
        dispatch({ type: FETCH_COLLECTIONS_FINISHED, payload: { 
          collections: collections
         }})
        if (!collections || _isEmpty(collections)) {
          throw new Error('Unexpectedly no collections returned')
        }

        return collections
      } catch (error) {
        dispatch({ type: FETCH_COLLECTIONS_FAILED })
      }
    }
}

/**
 * setActiveCollection
 * sets the active collection within the Store
 */
export function setActiveCollection (collectionId) {
  return ({
    type: SET_ACTIVE_COLLECTION,
    payload: {
      index: collectionId
    }
  })
}
