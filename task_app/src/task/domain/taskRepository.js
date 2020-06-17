const { TaskModel } = require('./taskModel');
const TaskBuilder = require('./taskBuilder');

const buildTask = (taskModel) => {
  const { _id, description, completed } = taskModel;
  return new TaskBuilder(_id, description, completed).build();
};

const saveTask = async (task) => {
  const taskModel = new TaskModel(task);
  const newTask = await taskModel.save();
  return buildTask(newTask);
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
  saveTask
};
