import React, { Component } from 'react'
import classnames from 'classnames'
import Loader from '../Loader'

export default class ProductsList extends Component {
  constructor () {
    super()
    this.getProducts = this.getProducts.bind(this)
  }

  getProducts (products) {
    return products.map((product, index, array) => {
      return (
        <div className="col-md-4 col-sm-12 animated fadeIn" key={product.product_id}>
          <Product product={product} />
        </div>
      )
    })
  }
  
  render () {
    const { isLoading, isError, products } = this.props
    
    if (isLoading) {
      return (
        <div className="ProductsList">
          <div className="ProductsList-loading animated zoomIn">
            <Loader />
          </div>
        </div>
      )
    } else if (isError) {
      return (
        <div className="ProductsList">
          <div className="ProductsList-error">
            <h2>Error Occured</h2>
          </div>
        </div>
      )
    }

    return (
      <div className="ProductsList">
        <div className="row">
          {this.getProducts(products)}
        </div>
      </div>
    )
  }
}

/**
 * Component to display the product information
 */
const Product = ({ product }) => {
  const { images, title, available, checkoutUrl } = product

  let productImage

  if (images && images[0]) {
    const image = images[0]
    productImage = (
      <div className="Product-image">
        <img src={image.src} className="img-responsive" alt={'Image for ' + title} />
      </div>
    )
  }

  return (
    <div className="Product">
      {productImage}
      <div className="Product-details">
        <div className="Product-title">
          <h1>{(title)}</h1>
        </div>
        <div className="Product-StockLabel">
          <StockLabel available={available} />
        </div>
      </div>
      <a href={checkoutUrl}>
        <div className="Product-button">
            Purchase ce Luxe
        </div>
      </a>
    </div>
  )
}

/**
 * Presentational Component in order to set the StockLabel for
 * the user
 */
const StockLabel = ({ available }) => {
  const classNames = classnames('StockLabel', {
    'StockLabel-InStock': available,
    'StockLabel-OutOfStock': !available
  })

  return (
    <span className={classNames}>
      {available ? 'In Stock' : 'Out of Stock'}
    </span>
  )
}
