import React, { Component } from 'react'
import configureStore from '../store/configureStore'
import { Provider } from 'react-redux'

import App from './App'

const store = configureStore()

const Root = () => (
  <Provider store={store}>
    <h1>Hello World</h1>
  </Provider>
)

export default Root
