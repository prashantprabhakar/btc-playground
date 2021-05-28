var bunyan = require('bunyan');
var logger = module.exports = {};

(function () {
    logger.root = bunyan.createLogger({
        name: 'btc-playground',
        streams : [{
            level: 'info',
            stream: process.stdout
        }, {
            level : 'error',
            stream: process.stderr
        }]
    });
})()
