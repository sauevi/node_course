/* eslint-disable consistent-return */
const mongoose = require('mongoose');

// eslint-disable-next-line import/no-commonjs
module.exports = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `The Id ${id} is invalid` });
  }
  req.id = id;
  next();
};
