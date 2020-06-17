/* eslint-disable consistent-return */
const lodash = require('lodash');
const { findUserByEmail } = require('../../user/domain/userRepository');
const { validateUser } = require('../../user/domain/userModel');

// eslint-disable-next-line import/no-commonjs
module.exports = async (req, res, next) => {
  const user = lodash.pick(req.body, ['name', 'email', 'password']);

  const { error } = validateUser(user);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const userExist = await findUserByEmail(user.email);

  if (!lodash.isEmpty(userExist)) {
    return res.status(403).json({
      message: 'user already registrated with this email'
    });
  }

  req.user = user;
  next();
};
