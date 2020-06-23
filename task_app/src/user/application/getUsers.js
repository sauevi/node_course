const { findUserById, getAllUsers } = require('../domain/userRepository');
const { responseUser } = require('./userUtils');

const getUserById = async (id) => {
  const user = await findUserById(id);
  return responseUser(user);
};

const getUsers = async () => {
  const promiseUsers = await getAllUsers();
  const allUsers = await Promise.all(promiseUsers);
  return allUsers.map(responseUser);
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getUserById,
  getUsers
};
