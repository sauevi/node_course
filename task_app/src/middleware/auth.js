/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

// eslint-disable-next-line import/no-commonjs
module.exports = (req, res, next) => {
  const authCookie = req.cookies.access_token;

  if (!authCookie) {
    return res.status(403).send();
  }

  const token = authCookie.split(' ')[1];

  try {
    const decode = jwt.verify(token, '123456789');
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).send();
  }
};
