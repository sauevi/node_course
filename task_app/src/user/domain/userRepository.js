/* eslint-disable no-underscore-dangle */
const { UserModel } = require('./userModel');
const UserBuilder = require('./userBuilder');
const { logger } = require('../../logger/logger');

const buildUser = (user) => {
  // eslint-disable-next-line object-curly-newline
  const { _id, name, email, password, isAdmin } = user;
  return new UserBuilder(_id, name, email, password)
    .setIsAdmin(isAdmin)
    .build();
};

const saveUser = async (user) => {
  try {
    const userModel = new UserModel(user);
    const newUser = await userModel.save();

    return buildUser(newUser);
  } catch (error) {
    logger.error(error);
    throw new Error('ERROR_SAVING_NEW_USER');
  }
};

const findUserById = async (id) => {
  try {
    const user = await UserModel.findById({ _id: id });

    if (user) {
      return buildUser(user);
    }

    return {};
  } catch (error) {
    logger.error(`searching user with id: ${id}`, error);
    throw new Error('ERROR_SEARCHING_USER_BY_ID');
  }
};

const getAllUsers = async () => {
  try {
    const users = await UserModel.find({});

    if (Array.isArray(users) && users.length) {
      return users.map((user) => buildUser(user));
    }

    return [];
  } catch (error) {
    logger.error(error);
    throw new Error('ERROR_SEARCHING_ALL_USERS');
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email });

    if (user) {
      return buildUser(user);
    }
    return {};
  } catch (error) {
    logger.error(`searching user with email: ${email}`, error);
    throw new Error('ERROR_SEARCHING_USER_BY_EMAIL');
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getAllUsers,
  saveUser,
  findUserById,
  findUserByEmail
};
