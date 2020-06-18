const lodash = require('lodash');
const { TaskModel } = require('./taskModel');
const TaskBuilder = require('./taskBuilder');
const { logger } = require('../../logger/logger');

const buildTask = (taskModel) => {
  const { _id, description, completed } = taskModel;
  return new TaskBuilder(_id)
    .setDescription(description)
    .setCompleted(completed)
    .build();
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

const deleteById = async (id) => {
  try {
    await TaskModel.deleteOne({ _id: id });
  } catch (error) {
    logger.error(`deleting task with id: ${id}`, error);
    throw new Error('ERROR_DELETING_TASK_BY_ID');
  }
};

const getIncompleteTask = async () => {
  try {
    const complitedTask = await TaskModel.find({ completed: { $eq: false } });
    if (Array.isArray(complitedTask) && complitedTask.length) {
      return complitedTask.map(buildTask);
    }

    return [];
  } catch (error) {
    logger.error(error);
    throw new Error('ERROR_GETTING_INCOMPLETE_TASK');
  }
};

const updateTask = async (id, task) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate({ _id: id }, task, {
      new: true
    });

    if (lodash.isEmpty(updatedTask)) {
      return {};
    }

    return buildTask(updatedTask);
  } catch (error) {
    logger.error(`updating task with id: ${id} `, error);
    throw new Error('ERROR_UPDATING_TASK');
  }
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  saveTask,
  getAllTaks,
  findTaskById,
  deleteById,
  getIncompleteTask,
  updateTask
};
