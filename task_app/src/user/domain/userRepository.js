/* eslint-disable no-underscore-dangle */
const lodash = require('lodash');
const { UserModel } = require('./userModel');
const UserBuilder = require('./userBuilder');
const { logger } = require('../../logger/logger');

const buildUser = async (user) => {
  await user.populate('tasks').execPopulate();
  // eslint-disable-next-line object-curly-newline
  const { _id, name, email, password, isAdmin, tasks, avatarImg } = user;
  return new UserBuilder(_id, name, email, password)
    .setIsAdmin(isAdmin)
    .setTask(tasks)
    .setAvatarImg(avatarImg)
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

    if (!lodash.isEmpty(user)) {
      return buildUser(user);
    }

    return user;
  } catch (error) {
    logger.error(`searching user with id: ${id}`, error);
    throw new Error('ERROR_SEARCHING_USER_BY_ID');
  }
};

const getAllUsers = async () => {
  try {
    const users = await UserModel.find({});

    if (!Array.isArray(users) && !users.length) {
      return [];
    }
    return users.map((user) => buildUser(user));
  } catch (error) {
    logger.error(error);
    throw new Error('ERROR_SEARCHING_ALL_USERS');
  }
};

const findUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!lodash.isEmpty(user)) {
      return buildUser(user);
    }
    return user;
  } catch (error) {
    logger.error(`searching user with email: ${email}`, error);
    throw new Error('ERROR_SEARCHING_USER_BY_EMAIL');
  }
};

const deleteUser = async (id) => {
  try {
    await UserModel.findOneAndDelete({ _id: id });
  } catch (error) {
    logger.error(`deleting user with id: ${id}`, error);
    throw new Error('ERROR_DELETING_USER');
  }
};

const updateUser = async (id, user) => {
  try {
    const userUpdated = await UserModel.findByIdAndUpdate(id, user, {
      new: true
    });

    if (!lodash.isEmpty(userUpdated)) {
      return buildUser(userUpdated);
    }

    return userUpdated;
  } catch (error) {
    logger.error(`updating user with id: ${id} `, error);
    throw new Error('ERROR_UPDATING_USER');
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  getAllUsers,
  saveUser,
  findUserById,
  findUserByEmail,
  deleteUser,
  updateUser
};
