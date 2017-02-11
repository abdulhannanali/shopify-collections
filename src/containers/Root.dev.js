import React, { Component } from 'react'
import { Provider } from 'react-redux'

import App from './App'

const Root = () => (
    <Provider>
        <App />
    </Provider>
)

export default Root