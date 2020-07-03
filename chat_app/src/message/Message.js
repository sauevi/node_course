const BaseMessage = require('./BaseMessage');

// eslint-disable-next-line import/no-commonjs
module.exports = class Message extends BaseMessage {
  constructor(text) {
    super();
    this.text = text;
  }

  getText() {
    return this.text;
  }
};
