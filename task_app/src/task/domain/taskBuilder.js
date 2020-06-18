const Task = require('./Task');

// eslint-disable-next-line import/no-commonjs
module.exports = class TaskBuilder {
  constructor(id) {
    this.id = id;
  }

  setDescription(description) {
    this.description = description;
    return this;
  }

  setCompleted(completed) {
    this.completed = completed;
    return this;
  }

  build() {
    return new Task(this.id, this.description, this.completed);
  }
};
