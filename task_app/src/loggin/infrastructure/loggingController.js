const express = require('express');
const lodash = require('lodash');
const handler = require('../../middleware/handler');
const generateToken = require('../application/generateToken');
const validateDoLoggin = require('../../middleware/loggin/validateLoggin');

const router = express.Router();

router.post(
  '/',
  validateDoLoggin,
  handler(async (req, res) => {
    const { loggin } = req;
    const response = await generateToken(loggin);

    if (lodash.isEmpty(response)) {
      return res.status(404).send();
    }

    if (response.error) {
      return res.status(401).send();
    }

    return res.json({
      token: response
    });
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
