const { deleteNoteByTitle } = require('../notes/note');

exports.command = 'remove <title>';

exports.desc = 'Remove a note';

exports.builder = {
  title: {
    describe: 'Note title to be removed',
    type: 'string',
    demandOption: true
  }
};

exports.handler = function (argv) {
  deleteNoteByTitle(argv.title);
};
