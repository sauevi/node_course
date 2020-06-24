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

  setIsAdmin(isAdmin) {
    this.isAdmin = isAdmin;
    return this;
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
    if (this.tasks) {
      this.tasks = this.tasks.map(
        (task) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          new TaskBuilder(task._id)
            .setDescription(task.description)
            .setCompleted(task.completed)
        // eslint-disable-next-line function-paren-newline
      );
    }

    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.isAdmin,
      this.tasks,
      this.avatarImg
    );
  }
};
