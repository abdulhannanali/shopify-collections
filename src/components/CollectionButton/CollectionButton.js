import React from 'react'
import { SHOPIFY_DOMAIN } from '../../constants'

const CollectionButton = ({ collection, isLoading }) => {
  if (isLoading) {
    return null
  }

  return (
    <div className="animated fadeIn">
      <div className="CollectionButton">
        <a href="" key={collection && collection.collection_id} onClick={onClick.bind(this, collection)}>
          Check out the full collection
        </a>
      </div>
    </div>
  )
}

function collectionUrl ({ handle }) {
  if (handle) {
    return `https://${SHOPIFY_DOMAIN}/collections/${handle}`
  }
}

function onClick (collection, event) {
  event.preventDefault()
  if (collection) {
    const handle = collectionUrl(collection)
    window.open(handle, '_blank')
  }
}

export default CollectionButton