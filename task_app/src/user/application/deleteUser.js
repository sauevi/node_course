const { deleteUser } = require('../domain/userRepository');

// eslint-disable-next-line import/no-commonjs
module.exports = (id) => deleteUser(id);
