/**
 * * This module is incharge of conecting to mongodb
 */
const mongoose = require('mongoose');
const { logger } = require('../logger/logger');
// eslint-disable-next-line import/no-commonjs
module.exports = (host) => {
  mongoose
    .set('useFindAndModify', false)
    .connect(host, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    .then(() => logger.info('conected to mongo'))
    .catch((err) => logger.fatal('fail conecting to mongo', err));
};
