var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    RESISTOPIA_BACKEND_WS: '"ws://reactor-backend-server/ws/frontend"', // TODO Get backend server IP
});
