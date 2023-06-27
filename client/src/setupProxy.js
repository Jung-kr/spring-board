// # main/frontend/src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

// "/board" 경로가 시작하면 프록시 미들웨어를 실행한다.
module.exports = function(app) {
  app.use(
    '/board',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true
    })
  );
};