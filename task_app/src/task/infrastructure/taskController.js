const express = require('express');
const lodash = require('lodash');
const handler = require('../../middleware/handler');
const validateTask = require('../../middleware/task/validateTaskCreate');
const validateId = require('../../middleware/validateId');
const auth = require('../../middleware/auth');
const { createTask } = require('../application/createTask');
const { getTaskById, getAllTask } = require('../application/getTask');
const deleteTask = require('../application/deleteTask');
const completeTask = require('../application/completeTask');
const updateTask = require('../application/updateTask');

const router = express.Router();

router.post(
  '/create',
  [validateTask, auth],
  handler(async (req, res) => {
    const { task, authUser } = req;
    const newTask = await createTask(task, authUser);
    res.status(201).json(newTask);
  })
);

router.get(
  '/:id',
  [validateId, auth],
  handler(async (req, res) => {
    const { id, authUser } = req;

    const response = await getTaskById(id, authUser.id);

    if (response.error) {
      return res.status(404).send();
    }

    return res.json(response);
  })
);

router.get(
  '/',
  auth,
  handler(async (req, res) => {
    const { authUser } = req;
    const query = lodash.pick(req.query, [
      'completed',
      'limitElements',
      'skipElements',
      'sortBy'
    ]);
    const response = await getAllTask(authUser.id, query);
    res.json(response);
  })
);

router.delete(
  '/:id',
  [validateId, auth],
  handler(async (req, res) => {
    const { id, authUser } = req;
    await deleteTask(id, authUser.id);
    res.send();
  })
);

router.patch(
  '/complete/:id',
  [validateId, auth],
  handler(async (req, res) => {
    const { id, authUser } = req;
    await completeTask(id, authUser.id);
    res.status(204).send();
  })
);

router.patch(
  '/update/:id',
  [validateId, auth],
  handler(async (req, res) => {
    const { authUser } = req;
    const task = lodash.pick(req.body, ['description', 'completed']);

    const response = await updateTask(req.id, task, authUser.id);

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
