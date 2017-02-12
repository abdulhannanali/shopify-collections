/**
 * CollectionState
 * Default state to be stored within the Immutable Map
 *
 * Following are the fields represented within the CollectionState
 * -  A key/value pair represented by Id for the collections
 * - `activeCollection` is the id of the collection to be used
 * -  Loading states for the collections stored within a map
 *      - loading (defaults to false)
 *      - fetched (defaults to false)
 *      - error (defaults to alse)
 */
import { Map } from 'immutable'

const CollectionState = Map({
  collections: Map(),
  activeCollection: undefined,
  fetched: false,
  loading: false,
  error: false
})

export default CollectionState
