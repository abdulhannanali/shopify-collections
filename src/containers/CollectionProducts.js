import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProductsList from '../components/ProductsList'
import CollectionButton from '../components/CollectionButton'

class CollectionProducts extends Component {
  render () {
    const { isLoading, isError, products, collection } = this.props

    return (
      <div className="row">
        <div className="col-sm-12">
          <ProductsList products={products} isLoading={isLoading} isError={isError} />
        </div>
        <div className="col-sm-12">
          <CollectionButton isLoading={isLoading} collection={collection} />
        </div>
      </div>
    )
  }
}


const ProductsContainer = connect(
  function mapStateToProps (state) {
    const activeCollectionId = state.getIn(['collection', 'activeCollection'])
    const collection = state.getIn(['product', 'collections', activeCollectionId])
    const collections = state.getIn(['collection', 'collections'])
    const activeCollectionDetails = collections.find((collection) => (
      collection.collection_id === activeCollectionId
    ))

    const isLoading = !collection || collection.get('loading')
    const isError = collection && collection.get('error')
    const products = collection && collection.get('products') 

    return {
      products,
      isLoading,
      isError,
      collection: activeCollectionDetails
    }
  }
)(CollectionProducts)

export default ProductsContainer