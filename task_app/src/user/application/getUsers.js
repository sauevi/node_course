const { findUserById, getAllUsers } = require('../domain/userRepository');
const { responseUser } = require('./userUtils');

const getUserById = async (id) => {
  const user = await findUserById(id);
  return responseUser(user);
};

const getUsers = async () => {
  const allUsers = await getAllUsers();
  return allUsers.map(responseUser);
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getUserById,
  getUsers
};
