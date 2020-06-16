/* eslint-disable no-underscore-dangle */
const { UserModel } = require('./userModel');
const UserBuilder = require('./userBuilder');

const buildUser = (user) => {
  // eslint-disable-next-line object-curly-newline
  const { _id, name, email, password, isAdmin } = user;
  return new UserBuilder(_id, name, email, password)
    .setIsAdmin(isAdmin)
    .build();
};

const saveUser = async (user) => {
  const userModel = new UserModel(user);
  const newUser = await userModel.save();

  return buildUser(newUser);
};

const findUserById = async (id) => {
  const user = await UserModel.findById(id);

  if (user) {
    return buildUser(user);
  }

  return {};
};

const findUserByEmail = async (email) => {
  const user = await UserModel.findOne({ email });

  if (user) {
    return buildUser(user);
  }
  return {};
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  saveUser,
  findUserById,
  findUserByEmail
};
