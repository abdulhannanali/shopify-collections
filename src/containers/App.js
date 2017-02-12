import React, { Component } from 'react'
import CollectionCarousel from './CollectionCarousel'
import Loader from '../components/Loader'
import 'animate.css'
import '../styles/App.css'

export default class App extends Component {
  render () {
    return (
      <div className="ShopifyCollection-App">
        <div className="ShopifyCollection--head animated fadeIn">
          <div className="container">
            <h1>Clothing de Placer</h1>
            <h2>The premium fashion brand for millenials</h2>
          </div>
        </div>
        <div className="container animated fadeIn">
          <div className="CollectionCarousel">
            <CollectionCarousel />
          </div>
        </div>
      </div>
    )
  }
}