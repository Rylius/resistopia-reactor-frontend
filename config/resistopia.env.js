var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    // TODO Get backend server IP
    RESISTOPIA_BACKEND_API: '"https://reactor-backend-server/api/v1"',
    RESISTOPIA_BACKEND_WS: '"ws://reactor-backend-server/ws/frontend"',
});
