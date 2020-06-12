const SimpleNodeLogger = require('simple-node-logger');

const logger = SimpleNodeLogger.createSimpleLogger('./logger/logs.log');

// eslint-disable-next-line import/no-commonjs
module.exports.logger = logger;
