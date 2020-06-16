const bcrypt = require('bcrypt');
const { saveUser } = require('../domain/userRepository');

const registrarUser = async (body) => {
  // eslint-disable-next-line object-curly-newline
  const { name, email, isAdmin } = body;

  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(body.password, salt);

  return saveUser({
    name,
    email,
    password,
    isAdmin
  });
};

// eslint-disable-next-line import/no-commonjs
module.exports = registrarUser;
