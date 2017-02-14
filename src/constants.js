// SHOPIFY Specific Constants
export const SHOPIFY_APP_ID = 6
export const SHOPIFY_ACCESS_TOKEN = 'bb426fb059df0e19cfc81ec4cb149601'
export const SHOPIFY_DOMAIN = 'fancyteestore.myshopify.com'

// COLLECTION_OPERATIONS
export const FETCH_COLLECTIONS_STARTED = 'FETCH_COLLECTIONS_STARTED'
export const FETCH_COLLECTIONS_FAILED = 'FETCH_COLLECTIONS_FAILED'
export const FETCH_COLLECTIONS_FINISHED = 'FETCH_COLLECTIONS_FINISHED'

export const SET_ACTIVE_COLLECTION = 'SET_ACTIVE_COLLECTION'

/* COLLECTIONS contains the ids of the collections
 * that can be only fetched
 */
export const COLLECTIONS = [
  410152273,
  410152593,
  410149841,
  410151313,
  410151697
]
export const INITIAL_COLLECTION = 410152273

// Action types for Products Reducer
export const FETCH_PRODUCTS_STARTED = 'FETCH_PRODUCTS_STARTED'
export const FETCH_PRODUCTS_FINISHED = 'FETCH_PRODUCTS_FINISHED'
export const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED'

// Change the Product options in case we want to change a Variant using the
// ProductReducer and SET_VARIANT sets the Variant explicitly, nice option to make some
// more changes
export const CHANGE_PRODUCT_OPTIONS = 'CHANGE_PRODUCT_OPTIONS'
export const SET_VARIANT = 'SET_VARIANT'