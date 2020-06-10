const { addNote } = require('../notes/note');

exports.command = 'add <title> <body>';

exports.desc = 'Add a new note';

exports.builder = {
  title: {
    describe: 'Note title',
    type: 'string',
    demandOption: true
  },
  body: {
    describe: 'Note body',
    type: 'string',
    demandOption: true
  }
};

exports.handler = argv => {
  addNote(argv.title, argv.body);
};
