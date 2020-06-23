/* eslint-disable consistent-return */
const lodash = require('lodash');
const validateLoggin = require('../../loggin/application/validLoggin');

// eslint-disable-next-line import/no-commonjs
module.exports = (req, res, next) => {
  const loggin = lodash.pick(req.body, ['name', 'email', 'password']);

  const { error } = validateLoggin(loggin);

  if (error) {
    return res.status(400).send();
  }

  req.loggin = loggin;
  next();
};
