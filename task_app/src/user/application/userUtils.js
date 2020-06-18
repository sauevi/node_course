const bcrypt = require('bcrypt');

const responseUser = (user) => ({
  id: user.getId(),
  name: user.getName(),
  email: user.getEmail()
});

const encypPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(password, salt);
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  responseUser,
  encypPassword
};
