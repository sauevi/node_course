/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-underscore-dangle */
const User = require('./User');
const TaskBuilder = require('../../task/domain/taskBuilder');

// eslint-disable-next-line import/no-commonjs
module.exports = class UserBuilder {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  setTask(tasks) {
    this.tasks = tasks;
    return this;
  }

  setAvatarImg(avatarImg) {
    this.avatarImg = avatarImg;
    return this;
  }

  build() {
    this.tasks = this.tasks.map((task) =>
      new TaskBuilder(task._id)
        .setDescription(task.description)
        .setCompleted(task.completed)
    );

    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.tasks,
      this.avatarImg
    );
  }
};
