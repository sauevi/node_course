const User = require('./User');

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

  build() {
    return new User(
      this.id,
      this.name,
      this.email,
      this.password,
      this.isAdmin
    );
  }
};
