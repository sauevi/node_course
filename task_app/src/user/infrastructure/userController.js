const express = require('express');
const registrarUser = require('../application/createUser');
const handler = require('../../middleware/handler');
const validateId = require('../../middleware/validateId');
const validateUser = require('../../middleware/user/validateUserCreate');
const { getUserById, getUsers } = require('../application/getUsers');
const deleteUser = require('../application/deleteUser');

const router = express.Router();

router.get(
  '/:id',
  validateId,
  handler(async (req, res) => {
    const { id } = req;
    const response = await getUserById(id);

    if (response.error) {
      return res.status(404).send();
    }

    return res.json(response);
  })
);

router.get(
  '/',
  handler(async (req, res) => {
    const response = await getUsers();
    res.json(response);
  })
);

router.post(
  '/create',
  validateUser,
  handler(async (req, res) => {
    const { user } = req;
    const newUser = await registrarUser(user);
    res.status(201).json(newUser);
  })
);

router.delete(
  '/:id',
  validateId,
  handler(async (req, res) => {
    const { id } = req;
    await deleteUser(id);
    res.send();
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
