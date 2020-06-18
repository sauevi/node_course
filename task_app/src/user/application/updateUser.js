const Joi = require('@hapi/joi');
const lodash = require('lodash');
const { updateUser } = require('../domain/userRepository');
const { responseUser, encypPassword } = require('./userUtils');

const validUserObject = (user) => {
  const schema = Joi.object({
    name: Joi.string(),
    password: Joi.string().min(8).max(1024)
  });

  return schema.validate(user);
};

// eslint-disable-next-line import/no-commonjs
module.exports = async (id, user) => {
  const { error } = validUserObject(user);

  if (error) {
    return { error: true };
  }

  if (user.password) {
    // eslint-disable-next-line no-param-reassign
    user.password = await encypPassword(user.password);
  }

  const updatedUser = await updateUser(id, user);

  if (!lodash.isEmpty(updatedUser)) {
    return responseUser(updatedUser);
  }

  return updatedUser;
};
