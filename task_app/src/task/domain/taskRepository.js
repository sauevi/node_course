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

const getAllTaks = async () => {
  try {
    const allTask = await TaskModel.find({});

    if (Array.isArray(allTask) && allTask.length) {
      return allTask.map(buildTask);
    }

    return [];
  } catch (error) {
    logger.error(error);
    throw new Error('ERROR_GETTING_ALL_TASK');
  }
};

const findTaskById = async (id) => {
  try {
    const task = await TaskModel.findById({ _id: id });

    if (task) {
      return buildTask(task);
    }

    return {};
  } catch (error) {
    logger.error(`getting task with id: ${id}`, error);
    throw new Error('ERROR_GETTING_TASK_BY_ID');
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  saveTask,
  getAllTaks,
  findTaskById
};
