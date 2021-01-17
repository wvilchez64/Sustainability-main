const apiServer = require('./src/assets/config/node-server.json')

const proxy = [
  {
    context: '/api',
    target: "http://" + apiServer.host + ":" + apiServer.port,
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;