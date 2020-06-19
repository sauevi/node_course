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
    const responseToken = await generateToken(loggin);

    if (lodash.isEmpty(responseToken)) {
      return res.status(404).send();
    }

    if (responseToken.error) {
      return res.status(401).send();
    }

    return res
      .cookie('access_token', `Bearer ${responseToken}`)
      .redirect(301, '/task/');
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
