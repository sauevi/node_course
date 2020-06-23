const express = require('express');
const lodash = require('lodash');
const handler = require('../../middleware/handler');
const generateToken = require('../application/generateToken');
const validateLoggin = require('../../middleware/loggin/validateLoggin');

const router = express.Router();

router.post(
  '/',
  validateLoggin,
  handler(async (req, res) => {
    const { loggin } = req;
    const responseToken = await generateToken(loggin);

    if (lodash.isEmpty(responseToken)) {
      return res.status(404).send();
    }

    if (responseToken.error) {
      return res.status(401).send();
    }

    return res.set('Authorization', `Bearer ${responseToken}`).json(loggin);
  })
);

// eslint-disable-next-line import/no-commonjs
module.exports = router;
