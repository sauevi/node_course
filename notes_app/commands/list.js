const { getNotes } = require('../notes/note');

exports.command = 'list';

exports.desc = 'list all notes';

exports.handler = function (argv) {
  getNotes();
};
