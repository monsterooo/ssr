import React from 'react'
import {hydrate} from 'react-dom'
import {Provider} from 'react-redux'
import configureStore from './redux/configureStore'
import App from './components/app'

// Read the state sent with markup
// 当客户端的代码被渲染时，它会去拿从服务的过来的window.__STATE__
const state = window.__STATE__;

// delete the state from global window object
// 然后删除window.__STATE__
delete window.__STATE__;

// reproduce the store used to render the page on server
// 使用服务端过来的window.__STATE__初始化store
const store = configureStore(state)

/**
 * hydrate the page to make sure both server and client
 * side pages are identical. This includes markup checking,
 * react comments to identify elements and more.
 */
// hydrate方法通过一系列的算法可以让服务的组件和客户端的组件像融合
hydrate(
  <Provider store={store} >
     <App />
  </Provider>,
  document.querySelector('#app')
)
