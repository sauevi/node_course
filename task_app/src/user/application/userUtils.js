const responseUser = (user) => ({
  id: user.getId(),
  name: user.getName(),
  email: user.getEmail()
});

// eslint-disable-next-line import/no-commonjs
module.exports = {
  responseUser
};
