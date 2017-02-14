/**
 * ProductsState.js
 * Contains the state of all the products with the variants, stores the data 
 * about Products and their varaints, with a goal of keeping state flat, and as normalized as possible, in 
 * order to keep this simple for us.
 * 
 * The ProductsState includes the following data structure to store data within them
 * - products (Includes all the products stored with <K,V> pair in a map), where Key is the ID of the product
 *   The value is an Immutable as we are going to perform operation to change the data within the map
 * - variants (Includes all the variants stored in a map with <K, V> pair in a map, where key is the ID of the variant), The values
 *   for the keys don't change so they can be standard JS Objects
 *
 * - collections - A <K, V> pair of a Map with List as values, the List contains all the products
 *   contained with in a collection, we are using a List instead of an Array cos this list might be modifiable in the
 *   future
 * 
 * 
 * Sample State in Standard JS Object
 * - products
 *   - product1 - Map({ title, body_html...})
 *   - product2 - Map({ title, body_html...})
 * - collections
 *   - collection1  - Map()  // Map contains the loading state, and List of collections to be used
 *   - collection2  - Map() 
 */
import { Map } from 'immutable'

const ProductsState = Map({
  collections: Map()
})


export default ProductsState