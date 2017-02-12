import React, { Component } from 'react'
import Slider from 'react-slick'
import classnames from 'classnames'
import './CollectionSlider.css'


export default class CollectionSlider extends Component {
  constructor () {
    super()
    
    // Not changing carousel settings for the purpose
    this.carouselSettings = {
      dots: true,
      speed: 500,
      centerMode: true,
      slidesToShow: 1,
      lazyLoad: true,
      fade: true
    }

    this.mapImageSlides = this.mapImageSlides.bind(this)
    this.afterChange = this.afterChange.bind(this)
    this.beforeChange = this.beforeChange.bind(this)
  }

  /**
   * mapImageSlides
   * map images to slides
   */
  mapImageSlides (collections) {
    if (collections.isEmpty()) {
      return (
        <div></div>
      )
    } else {
      return collections.map(({ collection_id, image, title, body_html }) => {
        if (image) {
          return (
            <div className="CollectionSlider-image" key={image.src}>
              <img className="img-responsive" src={image.src} alt={collection_id} />
              <div className="CollectionSlider-subtitle">
                <h2>{title}</h2>
                <h3>{body_html}</h3>
              </div>
            </div>
          )
        } else {
          return (
            <div className="CollectionSlider-textSlide">
              <h2>{title}</h2>
              <h3>{body_html}</h3>
            </div>
          )
        }
      })
    }
  }

  /**
   * getCollectionId
   * gets the collection index and returns the collection
   */
  getCollectionId (index) {
    return this.props.collections.get(index)['collection_id']    
  }

  /**
   * afterChange
   * function called after the change is done
   */
  afterChange (currentIndex) {
    const collectionId = this.props.collections.get(currentIndex)['collection_id']
    if (this.props.onChange) {
      this.props.onChange(collectionId)
    }
  }

  /**
   * beforeChange
   * change function to be called before the change actually happens
   * makes it way easier to handle changes
   * 
   * This can be used to load the items even before the component is mounted.
   * Even if the load is cancelled, we'll have lazy loaded the items to be displayed
   * if the transition is eventually made. SLICK STUFF!
   */
  beforeChange (currentIndex, nextIndex) {
    const currentCollectionId = this.getCollectionId(currentIndex)
    const nextCollectionId = this.getCollectionId(nextIndex)

    if (this.props.onBeforeChange) {
      this.props.onBeforeChange(currentCollectionId, nextCollectionId)
    }
  }

  render () {
    return (
      <div className="CollectionSlider">
        <Slider {...this.carouselSettings}
                afterChange={this.afterChange}
                beforeChange={this.beforeChange}>
          {this.mapImageSlides(this.props.collections)}
        </Slider>
      </div>
    )
  }
}