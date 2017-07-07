var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    RESISTOPIA_BACKEND_WS: '"ws://resistopia-reactor-backend.rylius.de/ws/frontend"',
});
