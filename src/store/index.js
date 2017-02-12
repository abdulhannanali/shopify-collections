const { NODE_ENV } = process.env

if (NODE_ENV === 'development') {
  module.exports = require('./configureStore.dev')
} else {
  module.exports = require('./configureStore.prod')
}