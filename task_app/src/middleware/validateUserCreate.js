/* eslint-disable consistent-return */
const lodash = require('lodash');
const Joi = require('@hapi/joi');
const { findUserByEmail } = require('../user/domain/userRepository');

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(1024).required(),
    isAdmin: Joi.boolean()
  });

  return schema.validate(user);
};

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
