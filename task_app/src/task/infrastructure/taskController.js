const express = require('express');
const handler = require('../../middleware/handler');
const validateTask = require('../../middleware/task/validateTaskCreate');
const { createTask } = require('../application/taskCreation');

const router = express.Router();

router.post(
  '/create',
  validateTask,
  handler(async (req, res) => {
    const { task } = req;
    const newTask = await createTask(task);
    res.status(201).json(newTask);
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
