const BaseMessage = require('./BaseMessage');

// eslint-disable-next-line import/no-commonjs
module.exports = class LocationMessage extends BaseMessage {
  constructor(url) {
    super();
    this.url = url;
  }

  getUrl() {
    return this.url;
  }
};
