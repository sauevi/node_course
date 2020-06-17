const lodash = require('lodash');
const { findUserById, getAllUsers } = require('../domain/userRepository');
const { responseUser } = require('./userUtils');

const getUserById = async (id) => {
  const user = await findUserById(id);

  if (lodash.isEmpty(user)) {
    return {
      error: true
    };
  }

  return responseUser(user);
};

const getUsers = async () => {
  const allUsers = await getAllUsers();

  if (!allUsers.length) {
    return [];
  }

  return allUsers.map(responseUser);
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getUserById,
  getUsers
};
