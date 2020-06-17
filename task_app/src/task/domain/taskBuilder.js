const Task = require('./Task');

// eslint-disable-next-line import/no-commonjs
module.exports = class TaskBuilder {
  constructor(id, description, completed = false) {
    this.id = id;
    this.description = description;
    this.completed = completed;
  }

  build() {
    return new Task(this.id, this.description, this.completed);
  }
};
