const { readNote } = require('../notes/note');

exports.command = 'read <title>';

exports.desc = 'Read a note';

exports.builder = {
  title: {
    describe: 'Note title',
    type: 'string',
    demandOption: true
  }
};

exports.handler = function (argv) {
  readNote(argv.title);
};
