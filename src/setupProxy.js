/**
 * 配置代理 npm install http-proxy-middleware --save
 * Note: You do not need to import this file anywhere. It is automatically registered when you start the development server.
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // 代理信息
  const proxyInfos = {
    '/dzapi': {
      target: 'http://192.168.0.241:8080',
      // target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      pathRewrite: {
        '^/dzapi': ''
      }
    },
    '/app': {
      target: 'http://120.92.92.218:8080/',
      changeOrigin: true
    }
  };
  Object.entries(proxyInfos).forEach(([key, proxyInfo]) => {
    app.use(createProxyMiddleware(key, proxyInfo));
  });
};
