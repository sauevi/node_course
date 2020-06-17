const { logger } = require('../logger/logger');
// eslint-disable-next-line import/no-commonjs
module.exports = function asyncMiddleware(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (ex) {
      logger.error(ex);
      res.status(500).send();
    }
  };
};
