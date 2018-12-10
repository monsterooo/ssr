const express = require('express'),
          app = express(),
     template = require('./views/template')
         path = require('path');


// Serving static files
// 静态文件服务
app.use('/assets', express.static(path.resolve(__dirname, 'assets')));
app.use('/media', express.static(path.resolve(__dirname, 'media')));

// hide powered by express
// 隐藏 express 头标识
app.disable('x-powered-by');
// start the server
// 启动服务
app.listen(process.env.PORT || 3000);

// our apps data model
// 模拟 app 数据模型
const data = require('./assets/data.json');

let initialState = {
  isFetching: false,
  apps: data
}

//SSR function import
// ssr 函数导入
const ssr = require('./views/server');

// server rendered home page
// 服务的渲染首页
app.get('/', (req, res) => {
  // 生成组件静态html和state
  const { preloadedState, content}  = ssr(initialState)
  // 返回给客户端html代码其中包括组件的html和state
  const response = template("Server Rendered Page", preloadedState, content)
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response);
});

// Pure client side rendered page
// 纯客户端渲染首页
app.get('/client', (req, res) => {
  let response = template('Client Side Rendered page')
  res.setHeader('Cache-Control', 'assets, max-age=604800')
  res.send(response);
});

// tiny trick to stop server during local development
// 在本地开发期间停止服务器的小技巧 访问 /exit
app.get('/exit', (req, res) => {
  if(process.env.PORT) {
    res.send("Sorry, the server denies your request")
  } else {
    res.send("shutting down")
    process.exit(0)
  }

});

  /**
 * 访问路由说明：
 * /        默认的服务的渲染首页
 * /client  纯客户端渲染首页
 * /exit    停止服务的渲染，只在开发模式
 */