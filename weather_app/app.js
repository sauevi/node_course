const express = require('express');
const logger = require('simple-node-logger').createSimpleLogger();

const port = process.env.PORT || 3000;
// init app
const app = express();
// load modules
require('./startup/routes')(app);

const server = app.listen(port, () => {
  logger.info(`Server start on port: ${port}`);
});

// eslint-disable-next-line import/no-commonjs
module.exports = server;
