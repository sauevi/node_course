const express = require('express');
const { logger } = require('./logger/logger');

const port = process.env.PORT || 3000;
// init app
const app = express();
// load modules
require('./startup/routes')(app);

const server = app.listen(port, () => {
  logger.info(`app runing on port: ${port}`);
});

// eslint-disable-next-line import/no-commonjs
module.exports = server;
