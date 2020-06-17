const lodash = require('lodash');
const { findUserById } = require('../domain/userRepository');

const getUserById = async (id) => {
  const user = await findUserById(id);

  if (lodash.isEmpty(user)) {
    return {
      error: true
    };
  }

  return user;
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getUserById
};
