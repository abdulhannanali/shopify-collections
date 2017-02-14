import React, { Component } from 'react'
import Slider from 'react-slick'
import { INITIAL_COLLECTION } from '../constants'

import './CollectionSlider.css'


export default class CollectionSlider extends Component {
  constructor () {
    super()
    
    // Not changing carousel settings for the purpose
    this.carouselSettings = {
      dots: false,
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
   * getInitialSlide
   * gets the index of the initial slide
   */
  getInitialSlide () {
    if (!this.initialSlide && this.props.collections) {
      let slideIndex
      this.props.collections.forEach(({ collection_id }, index) => {
        if (collection_id === INITIAL_COLLECTION) {
          slideIndex = index
        }
      })
      this.initialSlide = slideIndex
    }
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
            <div className="CollectionSlider-image" key={collection_id}>
              <img className="img-responsive" src={image.src} alt={collection_id} />
              <div className="CollectionSlider-subtitle">
                <span className="CollectionSlider-subtitleText">
                  <h2>{title}</h2>
                  <h3>{body_html}</h3>
                </span>
              </div>
            </div>
          )
        } else {
          return (
            <div className="CollectionSlider-textSlide" key={collection_id}>
              <div className="CollectionSlider-textSlide-text">
                <h2>{title}</h2>
                <h3>{body_html}</h3>
              </div>
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
    if (!this.initialSlide) {
      this.getInitialSlide()
    }
    
    return (
      <div className="CollectionSlider">
        <Slider {...this.carouselSettings}
                afterChange={this.afterChange}
                beforeChange={this.beforeChange}
                initialSlide={this.initialSlide}>
          {this.mapImageSlides(this.props.collections)}
        </Slider>
      </div>
    )
  }
}