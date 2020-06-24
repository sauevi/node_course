const Joi = require('@hapi/joi');
const lodash = require('lodash');
const { updateUser } = require('../domain/userRepository');
const { responseUser } = require('./userUtils');

const validUserObject = (user) => {
  const schema = Joi.object({
    name: Joi.string(),
    avatarImg: Joi.any(),
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

  const updatedUser = await updateUser(id, user);

  if (!lodash.isEmpty(updatedUser)) {
    return responseUser(updatedUser);
  }

  return updatedUser;
};
