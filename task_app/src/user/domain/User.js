const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-commonjs
module.exports = class User {
  constructor(id, name, email, password, isAdmin = false, tasks = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
    this.tasks = tasks;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  isAdmin() {
    return this.isAdmin;
  }

  getTasks() {
    return this.tasks;
  }

  generateToken() {
    return jwt.sign(
      {
        id: this.id,
        isAdmin: this.isAdmin
      },
      '123456789'
    );
  }
};
