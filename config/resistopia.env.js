var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    RESISTOPIA_BACKEND_API: '"http://192.168.2.20:8081/api/v1"',
    RESISTOPIA_BACKEND_WS: '"ws://192.168.2.20:8081/ws/frontend"',
});
