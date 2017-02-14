import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCollections, setActiveCollection } from '../actions/collectionActions'
import { fetchProductsIfRequired } from '../actions/productActions'
import { List } from 'immutable'
import Loader from '../components/Loader'
import { INITIAL_COLLECTION } from '../constants'


import CollectionSlider from '../components/CollectionSlider'

class CollectionCarousel extends Component {
  constructor () {
    super()
    this.onSlideChange = this.onSlideChange.bind(this)
    this.beforeSlideChange = this.beforeSlideChange.bind(this)
  }
  
  async componentDidMount () {
    // A manual Hack in order to fetch the collections
    this.props.setActiveCollection(INITIAL_COLLECTION)
    this.props.fetchCollections()
    this.props.fetchProducts(INITIAL_COLLECTION)
  }

  /**
   * onSlideChange
   * persistent change to the id of the slide
   */
  onSlideChange (collectionId) {
    const { setActiveCollection, fetchProducts } = this.props
    if (setActiveCollection) {
      setActiveCollection(collectionId)
      fetchProducts(collectionId)
    }
  }

  /**
   * beforeSlideChange
   * Event emitted when user is moving around, but haven't actually completed the move,
   * this event is going to be used to start the Fetching of products a little earlier
   * in order to complete the fetching a little earlier
   *
   * @param {Number} currentId `collection_id` of the current collection
   * @param {Number} nextId  `collection_id` of the upcoming collection
   */
  beforeSlideChange (currentId, nextId)  {
    const { fetchProducts } = this.props

    if (fetchProducts) {
      fetchProducts(nextId)
    }
  }

  render () {
    const { isLoading } = this.props

    if (isLoading) {
      return (
        <div className="CollectionCarousel-loader">
          <Loader />
        </div>
      )
    }

    return (
      <div className="CollectionCarousel">
        <div className="row">
          <div className="col-sm-12">
            <div className="CollectionCarousel-slider">
              <CollectionSlider 
                collections={this.props.collections}
                onChange={this.onSlideChange}
                onBeforeChange={this.beforeSlideChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const CarouselContainer = connect(
  function mapStateToProps (state, ownProps) {
    try {
      const collection = state.get('collection')

      return {
        isLoading: collection.get('loading') || false,
        hasFailed: collection.get('failed') || false,
        hasLoaded: collection.get('fetched') || false,
        collections: collection.get('collections') || List() 
      }
    } catch (error) {
      console.error(error)
    }
  },
  function mapDispatchToProps (dispatch) {
    return bindActionCreators({
      fetchCollections,
      setActiveCollection,
      fetchProducts: fetchProductsIfRequired
    }, dispatch)
  }
)(CollectionCarousel)

export default CarouselContainer