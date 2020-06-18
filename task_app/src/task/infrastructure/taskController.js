const express = require('express');
const lodash = require('lodash');
const handler = require('../../middleware/handler');
const validateTask = require('../../middleware/task/validateTaskCreate');
const validateId = require('../../middleware/validateId');
const { createTask } = require('../application/createTask');
const { getTaskById, getAllTask } = require('../application/getTask');
const deleteTask = require('../application/deleteTask');
const completeTask = require('../application/completeTask');
const updateTask = require('../application/updateTask');

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

router.patch(
  '/complete/:id',
  validateId,
  handler(async (req, res) => {
    const { id } = req;
    await completeTask(id);
    res.send();
  })
);

router.patch(
  '/update/:id',
  validateId,
  handler(async (req, res) => {
    const task = lodash.pick(req.body, ['description', 'completed']);

    const response = await updateTask(req.id, task);

    if (lodash.isEmpty(response)) {
      return res.status(404).send();
    }

    if (response.error) {
      return res.status(400).json(response.message);
    }

    return res.json(response);
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
