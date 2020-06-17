const bcrypt = require('bcrypt');
const { saveUser } = require('../domain/userRepository');
const { responseUser } = require('./userUtils');

const registrarUser = async (body) => {
  // eslint-disable-next-line object-curly-newline
  const { name, email, isAdmin } = body;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(body.password, salt);

  const newUser = await saveUser({
    name,
    email,
    password,
    isAdmin
  });

  return responseUser(newUser);
};

// eslint-disable-next-line import/no-commonjs
module.exports = registrarUser;
