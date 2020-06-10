const fs = require('fs/promises');
const chalk = require('chalk');

const getNotes = async () => {
  const notes = await loadNotes();

  titleNotes = notes.map(note => '- ' + note.title).join('\n');

  if (notes.length === 0) {
    printMessage(`You don't have notes at this moment`, 'notfound');
    return;
  }

  printMessage(`Your notes:\n${titleNotes}.`);
};

const addNote = async (title, body) => {
  const notes = await loadNotes();
  const duplicateNote = notes.find(note => note.title === title);

  if (duplicateNote) {
    printMessage(
      `can't create a note with title "${title}", it is already in use, please use a different one`,
      'error'
    );
    return;
  }

  notes.push({
    title,
    body
  });

  printMessage(
    `new note with title: "${title}" and body: "${body}" was created`,
    'success'
  );
  saveNotes(notes);
};

const deleteNoteByTitle = async title => {
  const notes = await loadNotes();
  const indxNoteDelete = notes.findIndex(note => note.title === title);

  if (indxNoteDelete < 0) {
    printMessage(`Note with title "${title}" was not found`, 'notfound');
    return;
  }

  printMessage(`Note with title "${title}" was removed`, 'success');

  notes.splice(indxNoteDelete, 1);
  saveNotes(notes);
};

const loadNotes = async () => {
  try {
    const notes = await fs.readFile('notes.json');
    const dataJson = notes.toString();
    return JSON.parse(dataJson);
  } catch (error) {
    return [];
  }
};

const readNote = async title => {
  const notes = await loadNotes();
  const noteToRead = notes.find(note => note.title === title);

  if (!noteToRead) {
    printMessage(`Note with title "${title}" was not found`, 'notfound');
    return;
  }

  printMessage(`📝 ${noteToRead.title} \n${noteToRead.body}`);
};

const saveNotes = async notes => {
  try {
    const dataJson = JSON.stringify(notes);
    await fs.writeFile('notes.json', dataJson);
  } catch (error) {
    console.error(chalk.redBright.inverse('Error saving notes'), error);
  }
};

const printMessage = (message, type = 'none') => {
  switch (type) {
    case 'success':
      console.log(chalk.green.inverse('Success') + chalk.green(` ${message}`));
      break;

    case 'error':
      console.log(chalk.red.inverse('Error') + chalk.red(` ${message}`));
      break;

    case 'notfound':
      console.log(chalk.red.inverse('Not Found') + chalk.red(` ${message}`));
      break;

    default:
      console.log(chalk.green(message));
      break;
  }
};

module.exports = {
  getNotes,
  addNote,
  loadNotes,
  deleteNoteByTitle,
  readNote
};
