// eslint-disable-next-line import/no-commonjs
module.exports = class BaseMessage {
  constructor() {
    this.createdAt = new Date();
  }

  getCreatedAt() {
    return this.createdAt;
  }
};
