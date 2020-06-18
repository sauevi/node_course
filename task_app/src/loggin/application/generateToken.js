const lodash = require('lodash');
const bcrypt = require('bcrypt');
const { findUserByEmail } = require('../../user/domain/userRepository');

// eslint-disable-next-line import/no-commonjs
module.exports = async (loggin) => {
  const { email, password } = loggin;

  const currentUser = await findUserByEmail(email);

  if (lodash.isEmpty(currentUser)) {
    return currentUser;
  }

  const validPassword = await bcrypt.compare(
    password,
    currentUser.getPassword()
  );

  if (!validPassword) {
    return { error: true };
  }

  return currentUser.generateToken();
};
