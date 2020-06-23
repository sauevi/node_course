const { deleteById } = require('../domain/taskRepository');

// eslint-disable-next-line import/no-commonjs
module.exports = (id, ownerId) => deleteById(id, ownerId);
