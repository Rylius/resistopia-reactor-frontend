const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    RESISTOPIA_BACKEND_API: '"http://localhost:8081/api/v1"',
    RESISTOPIA_BACKEND_WS: '"ws://localhost:8081/ws/frontend"',
});
