const { saveUser } = require('../domain/userRepository');
const { responseUser } = require('./userUtils');

const registrarUser = async (body) => {
  const newUser = await saveUser(body);
  return responseUser(newUser);
};

// eslint-disable-next-line import/no-commonjs
module.exports = registrarUser;
