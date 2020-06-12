const errorResponse = require('../service/errors');

// eslint-disable-next-line import/no-commonjs, consistent-return
module.exports = (req, res, next) => {
  const regexpr = new RegExp('^[A-Za-z]+$');
  const { city } = req.params;

  if (!regexpr.test(city)) {
    return res.status(400).send(errorResponse(city, 400));
  }

  req.city = city;
  next();
};
