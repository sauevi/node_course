// eslint-disable-next-line import/no-commonjs
module.exports = class Room {
  constructor(name) {
    this.name = name;
    this.users = [];
  }

  getName() {
    return this.name;
  }

  addUser(user) {
    this.users.push(user);
  }

  getAllUsers() {
    return this.users;
  }

  findUserById(id) {
    const { users } = this;
    return users.find((user) => user.getId() === id);
  }

  findUserByName(userName) {
    const { users } = this;
    return users.find((user) => user.getName() === userName);
  }

  deleteUser(id) {
    const { users } = this;
    const index = users.findIndex((user) => user.getId() === id);

    if (index !== -1) {
      return users.splice(index, 1)[0];
    }

    return {};
  }
};
