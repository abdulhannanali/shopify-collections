/**
 * productsAction.js
 * Actions which passed to the reducers to make change to the Store's Products data and state
 */
import {
  FETCH_PRODUCTS_STARTED,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_FINISHED
} from '../constants'
import shopClient from './shopClient'

// Lodash Goodness modularized
import _isEmpty from 'lodash.isempty'
import _get from 'lodash.get'
import _pick from 'lodash.pick'

/**
 * fetchQueryProducts
 * Queries the Shopify's API in order to give products related to a collection
 *
 * @param {Number} collectionId Id of the collection to query products
 * @param {Number} limit Maximum number of the products to be fetched from the API
 *
 * @returns {Array<Object>} Products fetched from the API with normalized responses 
 */
async function fetchQueryProducts (collectionId, limit = 3) {
  const products = await shopClient.fetchQueryProducts({
    collection_id: collectionId,
    limit: limit
  })

  if (!products || _isEmpty(products)) {
    throw new Error('Unexpected Response')
  }

  return normalizeResponse(products)
}

/**
 * Cherry picks the properties we only need and creates a new object, in order 
 * to eliminate the Complex structure we get with the ShopClient object
 *
 * @return {Array<Object>} normalized data according to schema
 */
function normalizeResponse(products) {
  return products.map((product) => {
    const pickedProduct = _pick(product.attrs, [
      'product_id',
      'title',
      'body_html',
      'images',
      'available',
      'vendor'
    ])
    pickedProduct['checkoutUrl'] = product.selectedVariant.checkoutUrl()

    return pickedProduct
  })
}

/**
 * Action creator to be used for the purpose of fetching 
 * products for a particular collection id
 * 
 * This function right now fetches only some of the very basic fields including:
 * - product_id,
 * - title
 * - body_html
 * - images
 * 
 * In order to take a complete look of what's fetched checkout normalizeResponse
 * The future version of this function will support more options
 */
function fetchProducts (collectionId) {
  return async (dispatch, getState) => {
    try {
      dispatch(fetchProductsStart(collectionId))
      const products = await fetchQueryProducts(collectionId, 3)
      dispatch(fetchProductsFinished(collectionId, products))
    } catch (error) {
      dispatch(fetchProductsFailed(collectionId))
    }
  }
}

/**
 * Function which tries to fetch the products only if they haven't been
 * fetched before. A simple optimizations that saves us expensive operations
 */
export function fetchProductsIfRequired (collectionId) {
  return async (dispatch, getState) => {
    const state = getState()
    const collection = state.getIn(['product', 'collections', collectionId])

    if (!collection || collection.get('failed')) {
      return await dispatch(fetchProducts(collectionId))
    } else {
      console.log('fetchProducts operation in progress or completed')
    }
  }
}

// Synchronous Action Creators
// These are the Synchronous Action Creators
// That go along with Asynchronous action creators to make functioning
// for us easier

/**
 * Action creator to return an action in order
 * to start the fetching of the products
 */
function fetchProductsStart (collectionId) {
  return {
    type: FETCH_PRODUCTS_STARTED,
    payload: {
      collectionId
    }
  }
}

/**
 * Action creator which is dispatched when the fetching of the products
 * is complete
 */
function fetchProductsFinished (collectionId, products = []) {
  return ({
    type: FETCH_PRODUCTS_FINISHED,
    payload: {
      collectionId,
      products
    }
  })
}

/**
 * Action creator which is dispatched when the fetching of the products
 * is failed
 */
function fetchProductsFailed (collectionId) {
  return ({
    type: FETCH_PRODUCTS_FAILED,
    payload: {
      collectionId
    }
  })
}