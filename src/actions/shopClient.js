/**
 * shopClient
 * Instance of a client used by application to talk with Shopify
 * using ShopifyBuy SDK
 * 
 * NOTE: In the future we might replace this client with a custom written implementation
 * but we can start from this SDK in order to keep things simple
 */
import ShopifyBuy from 'shopify-buy'
import {
  SHOPIFY_APP_ID,
  SHOPIFY_ACCESS_TOKEN,
  SHOPIFY_DOMAIN
} from '../constants'

const shopClient = ShopifyBuy.buildClient({
  appId: SHOPIFY_APP_ID,
  apiKey: SHOPIFY_ACCESS_TOKEN,
  domain: SHOPIFY_DOMAIN
})

if (process.env.NODE_ENV === 'development') {
  window.shopClient = shopClient
}

export default shopClient