/* eslint-disable consistent-return */
const lodash = require('lodash');
const { validateTask } = require('../../task/domain/taskModel');

// eslint-disable-next-line import/no-commonjs
module.exports = async (req, res, next) => {
  const task = lodash.pick(req.body, ['description', 'completed']);

  const { error } = validateTask(task);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  req.task = task;
  next();
};
