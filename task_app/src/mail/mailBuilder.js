const Mail = require('./Mail');

// eslint-disable-next-line import/no-commonjs
module.exports = class MailBuilder {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  setSubject(subject) {
    this.subject = subject;
    return this;
  }

  setText(text) {
    this.text = text;
    return this;
  }

  build() {
    if (!this.subject) {
      this.subject = '';
    }

    if (!this.text) {
      this.text = '';
    }

    return new Mail(this.from, this.to, this.subject, this.text);
  }
};
