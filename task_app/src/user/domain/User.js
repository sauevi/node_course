// eslint-disable-next-line import/no-commonjs
module.exports = class User {
  constructor(id, name, email, password, isAdmin = false) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
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
};
