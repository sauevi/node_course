const { TaskModel } = require('./taskModel');
const TaskBuilder = require('./taskBuilder');
const { logger } = require('../../logger/logger');

const buildTask = (taskModel) => {
  const { _id, description, completed } = taskModel;
  return new TaskBuilder(_id, description, completed).build();
};

const saveTask = async (task) => {
  try {
    const taskModel = new TaskModel(task);
    const newTask = await taskModel.save();
    return buildTask(newTask);
  } catch (error) {
    logger.error(error);
    throw new Error('ERROR_SAVING_NEW_TASK');
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  saveTask
};
