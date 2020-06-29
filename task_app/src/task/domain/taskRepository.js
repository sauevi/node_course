const lodash = require('lodash');
const { TaskModel } = require('./taskModel');
const TaskBuilder = require('./taskBuilder');
const { logger } = require('../../logger/logger');

const buildTask = (taskModel) => {
  // eslint-disable-next-line object-curly-newline
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

const getAllTaks = async (searchParams, limit, skip, sort) => {
  try {
    const allTask = await TaskModel.find(searchParams)
      .limit(limit)
      .skip(skip)
      .sort(sort);

    if (!allTask.length) {
      return [];
    }

    return allTask.map(buildTask);
  } catch (error) {
    logger.error(error);
    throw new Error('ERROR_GETTING_ALL_TASK');
  }
};

const findTaskById = async (id, ownerId) => {
  try {
    const task = await TaskModel.findById({ _id: id, owner: ownerId });

    if (task) {
      return buildTask(task);
    }

    return {};
  } catch (error) {
    logger.error(`getting task with id: ${id}`, error);
    throw new Error('ERROR_GETTING_TASK_BY_ID');
  }
};

const deleteById = async (id, ownerId) => {
  try {
    await TaskModel.deleteOne({ _id: id, owner: ownerId });
  } catch (error) {
    logger.error(`deleting task with id: ${id}`, error);
    throw new Error('ERROR_DELETING_TASK_BY_ID');
  }
};

const updateTask = async (id, task, ownerId) => {
  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: id, owner: ownerId },
      task,
      {
        new: true
      }
    );

    if (!lodash.isEmpty(updatedTask)) {
      return buildTask(updatedTask);
    }

    return updatedTask;
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
  updateTask
};
