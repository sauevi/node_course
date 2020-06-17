// eslint-disable-next-line import/no-commonjs
module.exports = class Task {
  constructor(id, description, completed) {
    this.id = id;
    this.description = description;
    this.status = completed;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description;
  }

  setDescription(description) {
    this.description = description;
  }

  getCompleted() {
    return this.completed;
  }

  completeTask() {
    this.completed = true;
  }
};
