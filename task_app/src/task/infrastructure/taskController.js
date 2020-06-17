const express = require('express');
const handler = require('../../middleware/handler');
const validateTask = require('../../middleware/task/validateTaskCreate');
const validateId = require('../../middleware/validateId');
const { createTask } = require('../application/createTask');
const { getTaskById, getAllTask } = require('../application/getTask');
const deleteTask = require('../application/deleteTask');

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

router.get(
  '/:id',
  validateId,
  handler(async (req, res) => {
    const { id } = req;
    const response = await getTaskById(id);

    if (response.error) {
      return res.status(404).send();
    }

    return res.json(response);
  })
);

router.get(
  '/',
  handler(async (req, res) => {
    const response = await getAllTask();
    res.json(response);
  })
);

router.delete(
  '/:id',
  validateId,
  handler(async (req, res) => {
    const { id } = req;
    await deleteTask(id);
    res.send();
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
