/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

// eslint-disable-next-line import/no-commonjs
module.exports = (req, res, next) => {
  const auth = req.header('Authorization');

  if (!auth) {
    return res.status(403).send();
  }

  const token = auth.replace('Bearer ', '');

  try {
    const decode = jwt.verify(token, '123456789');
    req.authUser = decode;
    next();
  } catch (error) {
    return res.status(401).send();
  }
};
