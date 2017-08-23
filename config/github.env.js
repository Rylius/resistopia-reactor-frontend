var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    RESISTOPIA_BACKEND_API: '"https://resistopia-reactor-backend.rylius.de/api/v1"',
    RESISTOPIA_BACKEND_WS: '"wss://resistopia-reactor-backend.rylius.de/ws/frontend"',
});
