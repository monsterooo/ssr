import React from 'react'
import { renderToString } from 'react-dom/server'

import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import App from './components/app'


module.exports = function render(initialState) {
  // Configure the store with the initial state provided
  // 根据调用这个函数传递进来的state初始化store，在/index.js调用ssr(initialState)
  const store = configureStore(initialState)

  // render the App store static markup ins content variable
  // 渲染组件的静态页面
  let content = renderToString(
    <Provider store={store} >
       <App />
    </Provider>
  );

  // Get a copy of store data to create the same store on client side 
  // 获取存储数据的副本，以便在客户端创建相同的存储。这里的意思就是服务的的stroe和客户端的要保持一致
  const preloadedState = store.getState()

  return {content, preloadedState};
}
