const express = require('express');
const registrarUser = require('../application/userRegistrar');
const handler = require('../../middleware/handler');
const validateUser = require('../../middleware/validateUserCreate');

const router = express.Router();

router.post(
  '/create',
  validateUser,
  handler(async (req, res) => {
    const { user } = req;
    const createdUser = await registrarUser(user);
    res.json(createdUser);
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
