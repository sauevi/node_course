const { saveUser } = require('../domain/userRepository');
const { responseUser, encypPassword } = require('./userUtils');

const registrarUser = async (body) => {
  // eslint-disable-next-line object-curly-newline
  const { name, email, isAdmin } = body;

  const password = await encypPassword(body.password);

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
