import React, { Component } from 'react'

export default class Footer extends Component {
  render () {
    return (
      <div className="Footer">
        <h4>Powered by 
        <a href="https://shopify.com">
          <span className="shopify"> Shopify </span>
        </a> 
        and it's amazing 
        <a href="https://shopify.github.io/js-buy-sdk/">
          <span className="shopify"> Buy SDK</span>
        </a>
        </h4>
        <h4>Licensed under MIT LICENSE. Check out the code at <a href="https://github.com/abdulhannanali/shopify-collections">Github</a></h4>
      </div>
    )
  }
}