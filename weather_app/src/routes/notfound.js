const express = require('express');

const router = express.Router();

router.get('*', (req, res) => {
  res.render('notfound');
});

// eslint-disable-next-line import/no-commonjs
module.exports = router;
