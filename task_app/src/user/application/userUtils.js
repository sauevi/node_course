const responseUser = (user) => ({
  id: user.getId(),
  name: user.getName(),
  email: user.getEmail(),
  task: user.getTasks(),
  avatarImg: user.getAvatarImg()
});

// eslint-disable-next-line import/no-commonjs
module.exports = {
  responseUser
};
